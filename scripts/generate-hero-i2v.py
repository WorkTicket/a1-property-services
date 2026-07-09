"""
Generate a real AI image-to-video hero from the Cedar Falls drone photo.
Uses CogVideoX-5B-I2V (open, ungated) with local GPU inference.
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import torch
from diffusers import CogVideoXImageToVideoPipeline
from diffusers.utils import export_to_video, load_image
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    Path.home(),
    '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets',
    'c__Users_Slay3r_AppData_Roaming_Cursor_User_workspaceStorage_98af54def8019a03ecdb0c968b92e0d6_images_Document-1a5e3913-5922-4a81-b926-27d5ac6f335c.png',
)
OUT_MP4 = ROOT / 'public/images/hero-drone-cedar-falls.mp4'
OUT_WEBM = ROOT / 'public/images/hero-drone-cedar-falls.webm'
TEMP_MP4 = ROOT / 'public/images/.hero-drone-temp.mp4'

MODEL = str(ROOT / 'models/cogvideox-5b-i2v')
PROMPT = (
    'Slow cinematic aerial drone shot over Cedar Falls Iowa river town. '
    'Gentle forward glide above the Cedar River, autumn trees sway softly, '
    'water ripples below, clouds drift slowly, golden afternoon sunlight, '
    'photorealistic, smooth camera motion, no people.'
)


def main() -> None:
    if not SOURCE.exists():
        print(f'Source image not found: {SOURCE}', file=sys.stderr)
        sys.exit(1)

    if not torch.cuda.is_available():
        print('CUDA GPU required for image-to-video generation.', file=sys.stderr)
        sys.exit(1)

    print(f'GPU: {torch.cuda.get_device_name(0)}')
    print(f'PyTorch: {torch.__version__}')
    print('Loading CogVideoX-5B-I2V (first run downloads ~10GB)...')

    pipe = CogVideoXImageToVideoPipeline.from_pretrained(
        MODEL,
        torch_dtype=torch.bfloat16,
        local_files_only=True,
    )
    pipe.enable_sequential_cpu_offload()
    pipe.vae.enable_tiling()
    pipe.vae.enable_slicing()

    image = load_image(str(SOURCE)).convert('RGB')
    # CogVideoX I2V: height 768, width divisible by 16
    image = image.resize((1360, 768), Image.Resampling.LANCZOS)

    print('Generating real video frames (this takes several minutes)...')
    result = pipe(
        prompt=PROMPT,
        image=image,
        num_videos_per_prompt=1,
        num_inference_steps=30,
        num_frames=49,
        guidance_scale=6,
        use_dynamic_cfg=True,
        generator=torch.Generator(device='cpu').manual_seed(42),
    )
    frames = result.frames[0]

    print(f'Exporting {len(frames)} frames...')
    export_to_video(frames, str(TEMP_MP4), fps=16)

    print('Post-processing for hero (crop to 16:9, upscale, loop-friendly trim)...')
    vf = 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p'
    subprocess.run(
        [
            'ffmpeg', '-y',
            '-i', str(TEMP_MP4),
            '-vf', vf,
            '-c:v', 'libx264',
            '-crf', '20',
            '-preset', 'slow',
            '-movflags', '+faststart',
            '-an',
            str(OUT_MP4),
        ],
        check=True,
    )

    subprocess.run(
        [
            'ffmpeg', '-y',
            '-i', str(OUT_MP4),
            '-c:v', 'libvpx-vp9',
            '-crf', '32',
            '-b:v', '0',
            '-an',
            str(OUT_WEBM),
        ],
        check=True,
    )

    TEMP_MP4.unlink(missing_ok=True)
    print('Done: real AI video generated.')
    print(' MP4:', OUT_MP4)
    print(' WebM:', OUT_WEBM)


if __name__ == '__main__':
    main()
