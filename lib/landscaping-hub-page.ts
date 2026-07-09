export type LandscapingServiceSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  bulletsHeading?: string
  serviceHref?: string
  serviceLinkLabel?: string
}

export type HubRecentProject = {
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
}

export const landscapingHubPage = {
  path: '/landscaping-services-in-cedar-falls',
  title: 'Landscaping Cedar Falls IA | 5-Star Rated | Free Estimates',
  description:
    'Top-rated landscaping in Cedar Falls, IA. Retaining walls, patios, lawn care & full installs. Licensed since 2014. 5-star Google rating. Free estimates — call (319) 464-1889.',
  keywords: [
    'landscaping cedar falls',
    'cedar falls landscaping',
    'landscaper cedar falls',
    'landscaping cedar falls ia',
    'landscaping company cedar falls',
    'landscape contractor cedar falls',
    'landscaping services cedar falls',
    'lawn care cedar falls',
    'hardscaping cedar falls',
    'retaining wall cedar falls',
    'paver patio cedar falls',
    'water features cedar falls',
  ],
  ogImage: '/images/services-hero.webp',
  ogImageAlt: 'Landscaping Cedar Falls by A1 Property Services',
  heroImage: '/images/services-hero.webp',
  heroImageAlt: 'Landscaping Cedar Falls with professional landscape and hardscape work',
  contentImage: '/images/content-landscaping-cedar-falls.webp',
  contentImageAlt:
    'Professional landscaping installation in Cedar Falls, Iowa by A1 Property Services',
  eyebrow: 'Landscaping Cedar Falls',
  h1: 'Landscaping Cedar Falls: Lawn Care, Patios & Retaining Walls',
  heroHeading:
    'Your local landscaping company in Cedar Falls, IA. Serving Waterloo and the Cedar Valley with lawn care, hardscaping, and full landscape installation.',
  introHeading: 'Landscaping Cedar Falls',
  introParagraphs: [
    'A1 Property Services is a locally owned landscaping company based in Cedar Falls, Iowa. We help homeowners and businesses across the Cedar Valley with everything from weekly lawn care and seasonal cleanups to retaining walls, paver patios, ponds, and complete landscape installation.',
    'When you search for landscaping Cedar Falls, you want a contractor who knows Iowa soil, freeze-thaw cycles, and drainage, not a one-size-fits-all approach. Our team plans every project around your property, your budget, and how you actually use your outdoor space.',
    'Whether you need a single service or a full property transformation, we deliver landscaping in Cedar Falls that looks great on day one and holds up for years. Licensed, insured, and rated 5 stars by local customers.',
  ],
  coreServicesHeading: 'Landscaping Cedar Falls: Core Services',
  coreServicesIntro:
    'Our landscaping Cedar Falls team provides professional installation and maintenance focused on long-term performance, visual appeal, and real property value. From expertly constructed retaining walls to complete landscape installations, we approach every project with careful planning, quality materials, and proven methods built for Iowa\u2019s climate.',
  featuredServices: [
    { label: 'Retaining Wall', href: '/retaining-wall-in-cedar-falls' },
    { label: 'Water Features', href: '/cedar-falls-water-features' },
    { label: 'Paver Patio', href: '/paver-patio-installation' },
  ],
  recentProjects: [
    {
      title: 'Retaining Wall — Cedar Falls Hillside',
      description: 'Block retaining wall with proper drainage on a sloped Cedar Falls lot.',
      href: '/retaining-wall-in-cedar-falls',
      image: '/images/wall-after-1.webp',
      imageAlt: 'Retaining wall installation on a Cedar Falls hillside',
    },
    {
      title: 'Paver Patio — Cedar Falls Backyard',
      description: 'Custom paver patio with steps and outdoor living space.',
      href: '/paver-patio-installation',
      image: '/images/patio-after-2.webp',
      imageAlt: 'Paver patio installation in a Cedar Falls backyard',
    },
    {
      title: 'Water Feature — Cedar Falls Garden',
      description: 'Backyard pond with aquatic plants and natural stone edging.',
      href: '/cedar-falls-water-features',
      image: '/images/water-feature-image-3.webp',
      imageAlt: 'Water feature installation in Cedar Falls, Iowa',
    },
    {
      title: 'Full Landscape Install — Cedar Valley',
      description: 'Complete yard transformation with grading, planting, and hardscape.',
      href: '/gallery',
      image: '/images/landscape-after-1.webp',
      imageAlt: 'Landscape installation project in the Cedar Valley',
    },
  ] satisfies HubRecentProject[],
  allServicesHeading: 'Full-Service Landscaping in Cedar Falls',
  allServicesIntro:
    'We offer a full range of landscaping Cedar Falls homeowners and businesses rely on: installation, maintenance, restoration, and seasonal services. Every project uses careful planning, quality materials, and proven methods. Whether residential or commercial, our work is built to perform in Iowa\u2019s climate while delivering lasting visual appeal.',
  serviceSections: [
    {
      heading: 'Landscape Installation',
      serviceHref: '/services/landscape-installation',
      serviceLinkLabel: 'landscape installation in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we don\u2019t just install landscapes we craft outdoor environments that are built to inspire, function, and endure. Every yard, garden, and commercial property holds unique potential, and our team works closely with you to transform that potential into a finished space that feels intentional and well-balanced.',
        'From the very beginning, our process is rooted in thoughtful planning. We take time to understand how you want your space to look, feel, and function, then evaluate the property itself to develop a design that fits both your vision and the land. The result is a tailored plan that blends visual appeal with practical structure, ensuring your landscape works just as well as it looks.',
        'Our installation work brings that design to life with precision and craftsmanship. We install healthy, long-lasting material, shape grading for proper drainage, and construct durable hardscape features such as patios, walkways, and retaining walls. Every element is placed with purpose, creating a natural flow between structure and open space. Finishing touches like decorative accents and custom outdoor features help complete the environment without overwhelming it.',
        'We build with longevity in mind. Soil preparation, plant selection, and material quality are all carefully considered to ensure your landscape doesn\u2019t just look good at completion it continues to perform year after year. The goal is simple: a space that stays healthy, stable, and visually strong long after the project is finished.',
      ],
    },
    {
      heading: 'Lawn Care & Mowing',
      serviceHref: '/services/lawn-care',
      serviceLinkLabel: 'lawn care in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we don\u2019t just mow lawns we maintain vibrant, healthy, and consistently attractive outdoor spaces. Serving both residential and commercial properties, our mowing services are designed to keep your lawn looking sharp year-round while also supporting long-term turf health.',
        'Our approach focuses on precision and consistency. Regular mowing is performed at the optimal height for your grass type, helping create a clean, uniform appearance across your entire property. We also take care of detailed edging and trimming along driveways, walkways, and landscape beds so every boundary looks intentional and professionally maintained.',
        'Because no two lawns are the same, we adjust our mowing schedules and techniques based on seasonal conditions. This ensures your grass isn\u2019t just being cut it\u2019s being managed in a way that supports steady, healthy growth throughout the year, even as weather patterns shift.',
        'Lawn care goes beyond mowing alone. We integrate broader turf health practices such as fertilization, weed control support, and general maintenance strategies that strengthen root systems and improve overall resilience. The goal is not just appearance, but long-term performance and durability.',
        'To provide complete property care, we also offer services like aeration, dethatching, leaf removal, and seasonal cleanups. These services work together to keep your lawn clean, breathable, and prepared for each new season.',
      ],
    },
    {
      heading: 'Landscape Preservation & Restoration',
      serviceHref: '/services/preservation-restoration',
      serviceLinkLabel: 'landscape restoration in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we help existing landscapes thrive while also restoring outdoor spaces that have become neglected or worn over time. Serving both residential and commercial properties, our preservation and restoration services are designed to bring balance back to your property improving health, function, and overall visual appeal throughout every season.',
        'Every restoration project begins with a detailed landscape assessment. We take time to evaluate plant health, soil conditions, drainage patterns, and the overall performance of your outdoor space. This allows us to identify what\u2019s working, what\u2019s struggling, and what needs to be improved to restore long-term stability and appearance.',
        'From there, we focus on precision care that strengthens the foundation of your landscape. This includes expert pruning and tree maintenance to encourage healthy growth, improve structure, and enhance safety across your property. Proper trimming isn\u2019t just cosmetic it plays a major role in the long-term vitality of your trees, shrubs, and plant beds.',
        'Soil and turf health are also a core part of restoration. We revitalize tired or compacted ground through aeration, fertilization support, and targeted soil improvements. These steps help restore nutrient balance, encourage stronger root systems, and bring grass and planting areas back to life.',
        'When necessary, we also replace or rejuvenate aging plant material. This helps restore color, texture, and depth throughout your landscape, ensuring your property feels fresh, balanced, and visually consistent rather than patchy or uneven.',
        'For properties dealing with uneven terrain or drainage issues, we implement grading adjustments and erosion control solutions that protect both structure and soil integrity. These improvements are designed not only to fix immediate issues but to prevent long-term damage and instability.',
        'Ultimately, our approach is proactive rather than reactive. We focus on maintaining long-term landscape health through thoughtful planning and consistent care strategies, ensuring your outdoor space remains functional, attractive, and sustainable well into the future.',
      ],
    },
    {
      heading: 'Tree Service',
      serviceHref: '/services/tree-service',
      serviceLinkLabel: 'tree service in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we provide comprehensive tree care for both residential and commercial properties. Whether it\u2019s routine maintenance or urgent intervention, our focus is on keeping your trees healthy, structurally sound, and visually balanced throughout the year.',
        'Proper tree trimming and pruning play a key role in long-term growth and safety. We carefully remove excess or damaged branches to improve structure, encourage healthy development, and maintain a clean, natural appearance. This process not only enhances the look of your trees but also helps prevent potential hazards before they become serious issues.',
        'When a tree becomes dead, diseased, or no longer fits the layout of your property, we provide safe and efficient removal services. Every removal is carried out with precision and care to ensure surrounding structures, landscaping, and hardscapes are fully protected throughout the process.',
        'We also offer stump grinding and removal to fully clear out unwanted remnants. Stumps can take up valuable space, create obstacles, and affect the overall appearance of your yard. Removing them restores both usability and visual cleanliness to your outdoor space.',
        'To support long-term tree health, we conduct detailed assessments that identify early signs of disease, stress, or structural issues. This allows us to recommend the right care solutions before problems develop further, helping preserve strong, thriving trees across your property.',
        'In emergency situations such as storm damage or hazardous tree conditions, our team responds quickly to protect your property and reduce further risk. These services are focused on safety, stabilization, and fast resolution when it matters most.',
        'We also provide professional planting and transplanting services for new or existing trees. Each installation is handled with care to ensure proper placement, healthy root development, and long-term growth, enhancing both the beauty and environmental value of your landscape.',
      ],
    },
    {
      heading: 'Landscape Maintenance',
      serviceHref: '/services/landscape-maintenance',
      serviceLinkLabel: 'landscape maintenance in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we provide comprehensive landscape maintenance designed to keep your outdoor spaces healthy, attractive, and consistently well-kept throughout the year. Serving both residential and commercial properties, our team ensures your landscape continues to thrive no matter the season.',
        'Our routine lawn care services focus on maintaining dense, healthy, and visually consistent turf. Through regular mowing, fertilization support, and overall turf management practices, we help promote strong growth while keeping your lawn clean, even, and well-maintained.',
        'We also provide detailed plant and garden care to keep your landscape vibrant and balanced. This includes pruning, weeding, and seasonal planting tailored to the specific needs of your garden beds. The goal is to encourage strong plant growth, improve structure, and maintain color and visual appeal throughout the year.',
        'Soil health is a key part of long-term landscape success. We improve soil conditions and support plant vitality through mulching and targeted care techniques that help retain moisture, regulate temperature, and strengthen root systems. These practices create a healthier foundation for everything growing on your property.',
        'As seasons change, your landscape requires additional attention. Our seasonal cleanup services include leaf removal, debris clearing, and general property preparation to keep your outdoor spaces clean, organized, and protected from seasonal stress and buildup.',
        'To further protect your investment, we provide proactive pest and disease management. By identifying potential issues early and addressing them effectively, we help safeguard your trees, shrubs, and flowers, ensuring they remain healthy, resilient, and visually strong year-round.',
      ],
    },
    {
      heading: 'Ponds & Water Features',
      serviceHref: '/cedar-falls-water-features',
      serviceLinkLabel: 'water features in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we design, build, and maintain pond and water garden features that enhance the beauty, balance, and overall functionality of outdoor spaces. Serving both residential and commercial properties, our focus is on creating water features that remain healthy, visually striking, and fully operational throughout the year.',
        'We begin with custom pond design and installation, developing water features that are tailored to your landscape and vision. From simple, natural-looking backyard ponds to more detailed water garden systems, each installation is carefully planned to integrate seamlessly into your property while ensuring long-term durability and performance.',
        'Aquatic planting plays an important role in both appearance and ecosystem stability. We select and install a variety of aquatic plants that enhance visual appeal while supporting natural balance within the water system. These plantings contribute to healthier water conditions and create a more vibrant, living feature.',
        'Maintaining proper water quality is essential for a successful pond or water garden. We monitor and manage conditions to keep water clean, clear, and balanced while preventing common issues such as algae growth and stagnation. This helps ensure your feature remains visually appealing and ecologically stable.',
        'We also install and maintain essential equipment such as pumps, filtration systems, and aeration units. These systems are critical for proper water circulation, oxygen levels, and overall pond health, while also reducing long-term maintenance demands.',
        'Ongoing maintenance is provided to keep your water feature performing at its best. This includes seasonal cleaning, debris removal, and algae control to ensure your pond remains functional, attractive, and easy to enjoy throughout the year.',
        'Finally, we support fish and aquatic wildlife health by helping maintain a balanced and sustainable ecosystem. With proper care and environmental management, your pond becomes a thriving habitat that enhances both natural beauty and long-term stability.',
      ],
    },
    {
      heading: 'Hydroseeding',
      serviceHref: '/services/hydroseeding',
      serviceLinkLabel: 'hydroseeding in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we provide professional hydroseeding solutions designed to establish thick, healthy, and evenly distributed grass growth across residential and commercial properties. This method offers a fast, cost-effective way to restore bare soil, repair damaged lawns, and create new turf areas with strong, long-term results.',
        'We begin with careful site preparation to ensure proper seed-to-soil contact and optimal germination conditions. Our hydroseeding process combines high-quality seed blends, mulch, fertilizer, and soil amendments into a specialized slurry that is evenly applied across the targeted area. This creates a nutrient-rich environment that encourages rapid and consistent grass growth.',
        'We use carefully selected grass seed blends tailored to your property\u2019s conditions and climate. Whether you need a durable turf for high-traffic areas or a lush, fine-textured lawn for residential spaces, we match the seed mix to achieve the best possible performance and appearance.',
        'Hydroseeding is an effective solution for erosion-prone areas, slopes, and large open spaces. The protective mulch layer helps hold soil in place, retain moisture, and shield seeds during germination, ensuring even coverage and reducing the risk of washout or patchy growth.',
        'After application, we provide guidance and support to ensure optimal germination conditions. Proper watering schedules, maintenance practices, and early-stage care are essential to achieving strong, uniform grass establishment and long-term lawn health.',
        'As the lawn begins to mature, we help ensure continued growth through proper maintenance recommendations. Over time, the hydroseeded area develops into a dense, resilient turf that enhances the beauty, usability, and value of your property.',
        'Our approach goes beyond initial application. We focus on creating sustainable lawn systems that continue to thrive with proper care, ensuring your hydroseeded areas remain green, healthy, and visually appealing for years to come.',
      ],
    },
    {
      heading: 'Snow Removal',
      serviceHref: '/services/snow-removal',
      serviceLinkLabel: 'snow removal in Cedar Falls',
      paragraphs: [
        'At A1 Property Services, we provide professional commercial snow removal services designed to keep your business properties safe, accessible, and fully operational throughout the winter season. We understand that even minor snow or ice buildup can disrupt operations, create safety risks, and impact customer access, which is why our team delivers fast, reliable service when it matters most.',
        'Our commercial snow plowing services are tailored specifically for parking lots, business complexes, retail centers, and industrial properties. Using commercial-grade equipment, we efficiently clear snow while maintaining the integrity of your pavement, curbs, and surrounding landscape features. Each site is handled with precision to ensure consistent, thorough results.',
        'We also provide detailed clearing of sidewalks, entryways, loading zones, and high-traffic pedestrian areas. These spaces are critical for both employee and customer safety, so we ensure they remain clear, accessible, and compliant with winter safety expectations throughout each snowfall event.',
        'Ice management is a key part of our commercial winter services. We apply salt and de-icing materials strategically to reduce slippery conditions and prevent ice buildup in high-risk areas. This proactive approach helps minimize liability risks while improving overall site safety.',
        'For commercial clients, we offer scheduled snow management and priority response plans. This means your property is monitored throughout winter storms and serviced promptly based on accumulation levels, ensuring minimal disruption to your operations.',
        'Our focus is simple dependable service, quick response times, and consistent results that keep your business running smoothly all winter long.',
      ],
    },
    {
      heading: 'Other Services',
      serviceHref: '/services',
      serviceLinkLabel: 'all landscaping services in Cedar Falls',
      paragraphs: [
        'In addition to our core landscaping and hardscaping services, A1 Property Services provides a range of supporting solutions designed to complete, enhance, and protect your outdoor space. These services are focused on improving overall functionality, strengthening long-term performance, and ensuring your property maintains a clean, polished appearance year-round.',
        'Every project is completed with careful planning, quality materials, and skilled workmanship to ensure lasting results. Whether you\u2019re enhancing an existing landscape or adding functional outdoor features, we deliver dependable solutions built to stand the test of time.',
      ],
      bulletsHeading: 'Additional Landscaping & Hardscaping Services',
      bullets: [
        'Planting & Mulching: Improve soil health, retain moisture, and enhance curb appeal with carefully selected plantings and high-quality mulch for healthier, longer-lasting landscapes.',
        'Grading & Drainage Solutions: Correct drainage issues, prevent water damage, and improve overall land usability with professional grading and water management solutions.',
        'Outdoor Feature Integration: Add character and functionality with custom fire pits, planters, decorative stone, edging, and accent features that blend naturally into your landscape design.',
        'Landscape Maintenance & Restoration: Maintain established landscapes or restore worn and aging outdoor spaces to improve health, appearance, and long-term performance.',
        'Property Enhancements & Site Improvements: Complete your outdoor space with finishing touches that improve usability, durability, and overall visual appeal.',
      ],
    },
  ] satisfies LandscapingServiceSection[],
  faqs: [
    {
      question: 'What landscaping services do you offer in Cedar Falls?',
      answer:
        'We provide full-service landscaping in Cedar Falls including lawn care and mowing, landscape installation, retaining walls, paver patios, ponds and water features, tree service, drainage, snow removal, and seasonal maintenance. Residential and commercial properties throughout the Cedar Valley.',
    },
    {
      question: 'How much does landscaping cost in Cedar Falls?',
      answer:
        'Landscaping costs in Cedar Falls depend on project size, materials, and scope. We provide free on-site estimates with clear, written pricing and no surprises. Contact us to schedule a consultation for your property.',
    },
    {
      question: 'Do you serve Cedar Falls and the surrounding Cedar Valley?',
      answer:
        'Yes. We are based in Cedar Falls and serve Waterloo, Hudson, Evansdale, Waverly, and communities across Black Hawk and Bremer counties. Most landscaping Cedar Falls projects are scheduled within a few days of your estimate.',
    },
    {
      question: 'What types of properties do you service?',
      answer:
        'We provide landscaping Cedar Falls services for both residential and commercial properties, including homes, office buildings, retail spaces, and large estates.',
    },
    {
      question: 'Do you offer ongoing maintenance or only one-time services?',
      answer:
        'We offer both. Schedule routine landscaping maintenance like lawn care and seasonal cleanups, or request one-time projects such as landscape installation, hardscaping, or pond creation.',
    },
    {
      question: 'How do I get a quote for my project or maintenance plan?',
      answer:
        'Contact us online or by phone. We\u2019ll assess your Cedar Falls property and provide a detailed, transparent estimate tailored to your needs.',
    },
  ],
  faqHeading: 'Landscaping Cedar Falls FAQs',
  contactHeading: 'Contact Your Cedar Falls Landscaper',
  contactIntro:
    'Ready to start your landscaping Cedar Falls project? Fill out our contact form, send us an email, or call our Cedar Falls office. We respond quickly and provide free estimates.',
  closingCopy:
    'Ready to transform your outdoor space with professional landscaping in Cedar Falls? Our team is here to bring your landscaping dreams to life.',
}
