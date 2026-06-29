export type City = {
  slug: string
  name: string
  county: string
  population: string
  description: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  introHeading: string
  introBody: string[]
  introBody2: string[]
  servicesIntro: string
  uniqueContent: {
    heading: string
    body: string
  }
  faqs: { q: string; a: string }[]
}

export const cities: City[] = [
  {
    slug: 'cedar-falls',
    name: 'Cedar Falls',
    county: 'Black Hawk',
    population: '40,000+',
    description:
      'Professional landscaping, retaining walls, paver patios, and lawn care in Cedar Falls, IA.',
    heroEyebrow: 'Cedar Falls · Iowa',
    heroTitle: 'Cedar Falls Landscaping|Professionals',
    heroSubtitle:
      'Full-service landscaping, hardscaping, and lawn care trusted by Cedar Falls homeowners since 2009.',
    metaTitle: 'Landscaping in Cedar Falls, IA | A1 Property Services',
    metaDescription:
      'Cedar Falls landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Licensed and insured. Free estimates.',
    metaKeywords: [
      'landscaping cedar falls',
      'cedar falls landscaping',
      'landscaper cedar falls ia',
      'retaining wall cedar falls',
      'paver patio cedar falls',
      'lawn care cedar falls',
      'hardscaping cedar falls',
    ],
    introHeading: 'Cedar Falls Landscaping for the Cedar Valley',
    introBody: [
      'Cedar Falls homeowners hire A1 Property Services for work that holds up through Iowa winters and still looks good every season. Retaining walls on sloped lots, paver patios for the backyard, and everything in between.',
    ],
    introBody2: [
      'We\'re based here in Cedar Falls, so we know the soil, the drainage, and what grows in Black Hawk County. Weekly mowing, a full yard install, or emergency snow removal. We\'re your local crew.',
    ],
    servicesIntro:
      'We offer a full range of landscaping, hardscaping, and property services for Cedar Falls homeowners and businesses.',
    uniqueContent: {
      heading: 'Why Cedar Falls Homeowners Choose A1',
      body: 'Cedar Falls has its own character, from the historic neighborhoods near the college to the newer builds on the north end. We\'ve worked in all of them. Our crews show up on time, talk straight, and don\'t leave until the job is done right. That\'s kept us busy here for over 15 years.',
    },
    faqs: [
      {
        q: 'What landscaping services do you offer in Cedar Falls?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation and maintenance, hydroseeding, ponds and water features, and snow removal for Cedar Falls residential and commercial properties.',
      },
      {
        q: 'How much does landscaping cost in Cedar Falls?',
        a: 'Every project is different. We provide free on-site estimates for Cedar Falls properties. Call us or fill out our quote form and we will give you honest, upfront pricing within 24 hours.',
      },
      {
        q: 'Are you licensed and insured in Cedar Falls?',
        a: 'Yes. A1 Property Services is a fully licensed Iowa contractor with liability insurance. We serve all Cedar Falls neighborhoods including College Hill, North Cedar, and South Cedar Falls.',
      },
      {
        q: 'How do I schedule a consultation in Cedar Falls?',
        a: 'Call us at (319) 464-1889 or fill out our online quote form. We typically respond within 24 hours and will come to your Cedar Falls property to discuss your project in person.',
      },
    ],
  },
  {
    slug: 'waterloo',
    name: 'Waterloo',
    county: 'Black Hawk',
    population: '67,000+',
    description:
      'Professional landscaping, retaining walls, paver patios, and lawn care in Waterloo, IA.',
    heroEyebrow: 'Waterloo \u00b7 Iowa',
    heroTitle: 'Waterloo Landscaping|Professionals',
    heroSubtitle:
      'Full-service landscaping, hardscaping, and lawn care for Waterloo homes and businesses.',
    metaTitle: 'Landscaping in Waterloo, IA | A1 Property Services',
    metaDescription:
      'Waterloo landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Licensed and insured. Free estimates for Waterloo properties.',
    metaKeywords: [
      'landscaping waterloo ia',
      'waterloo landscaping',
      'landscaper waterloo iowa',
      'retaining wall waterloo',
      'paver patio waterloo',
      'lawn care waterloo',
      'hardscaping waterloo',
    ],
    introHeading: 'Waterloo Landscaping for Your Property',
    introBody: [
      'Waterloo yards come in all shapes. Older neighborhoods have big mature trees that need careful pruning. Newer developments need fresh plantings and layout. We handle both the same way we always have: show up, do the work, do it right.',
    ],
    introBody2: [
      'Residential lawns, commercial properties, retaining walls, paver patios, full yard installs, and seasonal maintenance across Waterloo. Our crews know the area and show up ready to work.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for Waterloo homeowners and commercial properties.',
    uniqueContent: {
      heading: 'Reliable Landscaping Across Waterloo',
      body: 'Waterloo has real variety in its properties, and we like that. Tight lots near downtown, big suburban yards on the outskirts. Every job gets the same standard: proper base prep on hardscape, clean bed edges, and we keep you in the loop.',
    },
    faqs: [
      {
        q: 'Do you serve all of Waterloo?',
        a: 'Yes. We serve all Waterloo neighborhoods and commercial areas including downtown Waterloo, the Crossroads area, and residential developments throughout the city.',
      },
      {
        q: 'Can you handle commercial landscaping in Waterloo?',
        a: 'Yes. We provide landscape maintenance, snow removal, and hardscaping for commercial properties in Waterloo. Contact us for a commercial quote.',
      },
      {
        q: 'How quickly can you start my landscaping project in Waterloo?',
        a: 'Spring and fall fill up fast. We recommend contacting us early to get on the schedule. We typically begin projects within 1-2 weeks of signing.',
      },
      {
        q: 'Do you offer free estimates for Waterloo properties?',
        a: 'Yes. We provide free, no-obligation estimates for all Waterloo properties. Call (319) 464-1889 or fill out our online form to schedule yours.',
      },
    ],
  },
  {
    slug: 'hudson',
    name: 'Hudson',
    county: 'Black Hawk',
    population: '2,200+',
    description:
      'Landscaping, retaining walls, and lawn care in Hudson, IA. Small-town service with professional results.',
    heroEyebrow: 'Hudson \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Hudson, Iowa',
    heroSubtitle:
      'Hudson homeowners trust us for quality landscaping, hardscaping, and lawn care that fits their property.',
    metaTitle: 'Landscaping in Hudson, IA | A1 Property Services',
    metaDescription:
      'Hudson IA landscaping. Retaining walls, paver patios, lawn care, tree service and more. Small town service, solid results. Free estimates.',
    metaKeywords: [
      'landscaping hudson ia',
      'hudson iowa landscaping',
      'landscaper hudson ia',
      'retaining wall hudson',
      'lawn care hudson iowa',
      'hardscaping hudson',
    ],
    introHeading: 'Hudson Landscaping Done Right',
    introBody: [
      'Hudson is a close-knit town, and we treat every job there like it\'s our own yard. Retaining wall for a slope, paver patio for the backyard, or regular mowing. Same crew, same standards.',
    ],
    introBody2: [
      'We\'re just up the road from Hudson, so travel time is short and we can get there fast when you need us. Spring cleanups, mulching, full yard installs, snow removal.',
    ],
    servicesIntro:
      'Professional landscaping and hardscaping services for Hudson homeowners.',
    uniqueContent: {
      heading: 'Small Town Service, Professional Results',
      body: 'Hudson folks value reliability, and that\'s what we bring. We show up when we say we will, talk straight, and don\'t cut corners. Word gets around in a small town, and we\'re proud of our name here.',
    },
    faqs: [
      {
        q: 'Do you serve Hudson, IA?',
        a: 'Yes. A1 Property Services provides landscaping, hardscaping, and lawn care services to Hudson and the surrounding Black Hawk County area.',
      },
      {
        q: 'What landscaping services do you offer in Hudson?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation, maintenance, hydroseeding, and snow removal in Hudson.',
      },
      {
        q: 'How do I get a quote for my Hudson property?',
        a: 'Call us at (319) 464-1889 or fill out our online form. We provide free estimates for Hudson properties and typically respond within 24 hours.',
      },
    ],
  },
  {
    slug: 'evansdale',
    name: 'Evansdale',
    county: 'Black Hawk',
    population: '4,500+',
    description:
      'Landscaping, retaining walls, and lawn care in Evansdale, IA. Professional service for your property.',
    heroEyebrow: 'Evansdale \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Evansdale, Iowa',
    heroSubtitle:
      'Reliable landscaping and hardscaping services for Evansdale homeowners and businesses.',
    metaTitle: 'Landscaping in Evansdale, IA | A1 Property Services',
    metaDescription:
      'Evansdale IA landscaping. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for Evansdale properties.',
    metaKeywords: [
      'landscaping evansdale ia',
      'evansdale iowa landscaping',
      'landscaper evansdale',
      'retaining wall evansdale',
      'lawn care evansdale',
    ],
    introHeading: 'Evansdale Landscaping, Local Crew',
    introBody: [
      'Evansdale homeowners and businesses count on A1 Property Services for landscaping that makes their properties look good. Same quality work we bring to every job in the Cedar Valley.',
    ],
    introBody2: [
      'From lawn maintenance and tree service to retaining walls and paver patios, we handle projects of every size in Evansdale. Our crews are local, experienced, and committed to doing the job right the first time.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Evansdale properties.',
    uniqueContent: {
      heading: 'Dependable Landscaping in Evansdale',
      body: 'We\'ve been serving Evansdale for years and know the area well. Ongoing lawn care, a one-time yard install, or snow removal for your driveway and walks. Reliable work at fair prices.',
    },
    faqs: [
      {
        q: 'Does A1 Property Services work in Evansdale?',
        a: 'Yes. We provide full landscaping, hardscaping, and lawn care services to Evansdale and the surrounding area.',
      },
      {
        q: 'What services do you offer in Evansdale?',
        a: 'Retaining walls, paver patios, lawn care and mowing, tree service, landscape installation, maintenance, hydroseeding, and snow removal.',
      },
      {
        q: 'How do I schedule service in Evansdale?',
        a: 'Call (319) 464-1889 or fill out our online form. We provide free estimates and typically respond within 24 hours.',
      },
    ],
  },
  {
    slug: 'la-porte-city',
    name: 'La Porte City',
    county: 'Black Hawk',
    population: '2,200+',
    description:
      'Landscaping, retaining walls, and lawn care in La Porte City, IA. Professional service for your property.',
    heroEyebrow: 'La Porte City \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in La Porte City, Iowa',
    heroSubtitle:
      'Quality landscaping and hardscaping services for La Porte City homeowners.',
    metaTitle: 'Landscaping in La Porte City, IA | A1 Property Services',
    metaDescription:
      'La Porte City IA landscaping. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for La Porte City properties.',
    metaKeywords: [
      'landscaping la porte city ia',
      'la porte city landscaping',
      'landscaper la porte city iowa',
      'retaining wall la porte city',
      'lawn care la porte city',
    ],
    introHeading: 'La Porte City Landscaping You Can Count On',
    introBody: [
      'La Porte City values hard work and follow-through, and that\'s how we run every job there. Retaining walls, paver patios, regular mowing. We treat your property like our own.',
    ],
    introBody2: [
      'We serve La Porte City with the same equipment and crews that work our Cedar Falls jobs. Full yard build or seasonal cleanups, we\'ve got you covered.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for La Porte City homeowners.',
    uniqueContent: {
      heading: 'Bringing Professional Landscaping to La Porte City',
      body: 'Homeowners in La Porte City want good work without the runaround. That\'s what we give you. Clear estimates, honest communication, and finished projects that look good and last.',
    },
    faqs: [
      {
        q: 'Do you provide landscaping services in La Porte City?',
        a: 'Yes. A1 Property Services serves La Porte City with retaining walls, paver patios, lawn care, tree service, and more.',
      },
      {
        q: 'How far in advance do I need to book?',
        a: 'Spring and fall book up quickly. We recommend reaching out early. Give us a call at (319) 464-1889 and we will get you on the schedule.',
      },
      {
        q: 'Do you offer free estimates in La Porte City?',
        a: 'Yes. We provide free, no-obligation estimates for all La Porte City properties. Contact us to schedule yours.',
      },
    ],
  },
  {
    slug: 'dike',
    name: 'Dike',
    county: 'Grundy',
    population: '1,300+',
    description:
      'Landscaping, retaining walls, and lawn care in Dike, IA. Professional service for your property.',
    heroEyebrow: 'Dike \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Dike, Iowa',
    heroSubtitle:
      'Dependable landscaping and hardscaping services for Dike homeowners.',
    metaTitle: 'Landscaping in Dike, IA | A1 Property Services',
    metaDescription:
      'Dike IA landscaping. Retaining walls, paver patios, lawn care, tree service and more. Serving Grundy County. Free estimates.',
    metaKeywords: [
      'landscaping dike ia',
      'dike iowa landscaping',
      'landscaper dike ia',
      'retaining wall dike',
      'lawn care dike iowa',
    ],
    introHeading: 'Dike Landscaping, Trusted Since 2009',
    introBody: [
      'Dike may be a smaller community, but we bring the same professional landscaping services here that we provide across the entire Cedar Valley. From regular lawn mowing and maintenance to structural retaining walls and custom paver patios, we treat every Dike property with care.',
    ],
    introBody2: [
      'As a locally owned company based in Cedar Falls, we know the landscape challenges that Grundy County properties face. We offer practical solutions that work for your property and your budget.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Dike and Grundy County.',
    uniqueContent: {
      heading: 'Professional Landscaping in Dike',
      body: 'Dike homeowners deserve the same quality work as anywhere else. Hydroseeding a new lawn, building a paver patio, whatever you need. Same reliability that built our name across the Cedar Valley.',
    },
    faqs: [
      {
        q: 'Does A1 Property Services serve Dike, IA?',
        a: 'Yes. We provide landscaping, hardscaping, and lawn care services to Dike and the surrounding Grundy County area.',
      },
      {
        q: 'What services do you offer in Dike?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation and maintenance, hydroseeding, and snow removal.',
      },
      {
        q: 'How can I get a quote for my Dike property?',
        a: 'Call us at (319) 464-1889 or fill out our online form. We provide free estimates for Dike properties.',
      },
    ],
  },
  {
    slug: 'waverly',
    name: 'Waverly',
    county: 'Bremer',
    population: '10,400+',
    description:
      'Professional landscaping, retaining walls, paver patios, and lawn care in Waverly, IA.',
    heroEyebrow: 'Waverly \u00b7 Iowa',
    heroTitle: 'Waverly Landscaping|Professionals',
    heroSubtitle:
      'Full-service landscaping, hardscaping, and lawn care trusted by Waverly homeowners.',
    metaTitle: 'Landscaping in Waverly, IA | A1 Property Services',
    metaDescription:
      'Waverly IA landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Licensed and insured. Free estimates for Bremer County properties.',
    metaKeywords: [
      'landscaping waverly ia',
      'waverly iowa landscaping',
      'landscaper waverly ia',
      'retaining wall waverly',
      'paver patio waverly',
      'lawn care waverly iowa',
    ],
    introHeading: 'Waverly Landscaping for Bremer County',
    introBody: [
      'Waverly is a growing community with diverse properties, from historic homes near the downtown to newer developments on the edge of town. We bring our full range of landscaping services to Waverly: retaining walls for sloped lots, paver patios for backyard living, lawn care and mowing, tree service, and seasonal cleanups.',
    ],
    introBody2: [
      'Being based just up the road in Cedar Falls means we can get to Waverly quickly and reliably. Our crews know Bremer County soil and growing conditions, and we treat every Waverly property with the same standard of work we bring to every job.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Waverly homeowners and businesses.',
    uniqueContent: {
      heading: 'Reliable Landscaping for Waverly Properties',
      body: 'Waverly families want landscaping that looks good and holds up. That is what we deliver. From the first consultation to the final walk-through, we communicate clearly and work efficiently so your project stays on track and on budget.',
    },
    faqs: [
      {
        q: 'Do you serve Waverly, IA?',
        a: 'Yes. A1 Property Services provides landscaping, hardscaping, and lawn care services to Waverly and all of Bremer County.',
      },
      {
        q: 'What landscaping services do you offer in Waverly?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation, drainage solutions, and snow removal for Waverly properties.',
      },
      {
        q: 'How do I get a quote for my Waverly property?',
        a: 'Call us at (319) 464-1889 or fill out our online quote form. We provide free estimates for Waverly properties and typically respond within 24 hours.',
      },
    ],
  },
  {
    slug: 'denver',
    name: 'Denver',
    county: 'Bremer',
    population: '1,900+',
    description:
      'Landscaping, retaining walls, and lawn care in Denver, IA. Professional service for your property.',
    heroEyebrow: 'Denver \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Denver, Iowa',
    heroSubtitle:
      'Quality landscaping and hardscaping services for Denver homeowners and properties.',
    metaTitle: 'Landscaping in Denver, IA | A1 Property Services',
    metaDescription:
      'Denver IA landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for Denver and Bremer County properties.',
    metaKeywords: [
      'landscaping denver ia',
      'denver iowa landscaping',
      'landscaper denver ia',
      'retaining wall denver ia',
      'lawn care denver iowa',
      'landscaping bremer county',
    ],
    introHeading: 'Denver Landscaping, Local Quality',
    introBody: [
      'Denver is a tight-knit community, and we treat every landscaping job there with the same care we would our own property. Retaining walls for drainage, paver patios for backyard entertaining, regular mowing and maintenance. Same crew, same standards as our Cedar Falls work.',
    ],
    introBody2: [
      'We are located just minutes from Denver, so travel time is short and we can respond quickly when you need us. Spring cleanups, mulching, full landscape installations, and snow removal. We have the equipment and experience to handle it all.',
    ],
    servicesIntro:
      'Professional landscaping and hardscaping services for Denver homeowners.',
    uniqueContent: {
      heading: 'Small Town Service, Professional Results',
      body: 'Denver residents value dependability, and that is what we provide. We show up when we say we will, communicate clearly, and do the job right. Our reputation across Bremer County is built on quality work and honest communication.',
    },
    faqs: [
      {
        q: 'Does A1 Property Services serve Denver, IA?',
        a: 'Yes. We provide full landscaping, hardscaping, and lawn care services to Denver and the surrounding Bremer County area.',
      },
      {
        q: 'What services do you offer in Denver?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation, drainage solutions, and snow removal.',
      },
      {
        q: 'How do I schedule landscaping in Denver?',
        a: 'Call us at (319) 464-1889 or fill out our online quote form. We provide free estimates for Denver properties.',
      },
    ],
  },
  {
    slug: 'jesup',
    name: 'Jesup',
    county: 'Buchanan',
    population: '2,900+',
    description:
      'Landscaping, retaining walls, and lawn care in Jesup, IA. Professional service for your property.',
    heroEyebrow: 'Jesup \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Jesup, Iowa',
    heroSubtitle:
      'Reliable landscaping and hardscaping services for Jesup homeowners and businesses.',
    metaTitle: 'Landscaping in Jesup, IA | A1 Property Services',
    metaDescription:
      'Jesup IA landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for Jesup and Buchanan County properties.',
    metaKeywords: [
      'landscaping jesup ia',
      'jesup iowa landscaping',
      'landscaper jesup ia',
      'retaining wall jesup',
      'lawn care jesup iowa',
    ],
    introHeading: 'Jesup Landscaping You Can Count On',
    introBody: [
      'Jesup is a growing community in Buchanan County, and homeowners here want landscaping that looks good and works for their property. We bring our full range of services to Jesup: retaining walls for sloped lots, paver patios for backyard entertaining, regular lawn mowing and maintenance, tree service, and more.',
    ],
    introBody2: [
      'Whether you need a full landscape installation or just seasonal maintenance, our Jesup clients get the same quality work and reliable service we provide across the Cedar Valley. We pride ourselves on showing up on time and leaving every property looking better than we found it.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Jesup homes and businesses.',
    uniqueContent: {
      heading: 'Quality Landscaping in Jesup',
      body: 'Jesup deserves the same professional landscaping as larger communities. That is what we deliver. From the initial consultation to project completion, we communicate clearly and work efficiently so your project turns out exactly as planned.',
    },
    faqs: [
      {
        q: 'Does A1 Property Services serve Jesup, IA?',
        a: 'Yes. We provide full landscaping, hardscaping, and lawn care services to Jesup and Buchanan County.',
      },
      {
        q: 'What landscaping services do you offer in Jesup?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation and maintenance, drainage solutions, and snow removal.',
      },
      {
        q: 'How do I get a free estimate in Jesup?',
        a: 'Call us at (319) 464-1889 or fill out our online quote form. We provide free estimates for all Jesup properties.',
      },
    ],
  },
  {
    slug: 'parkersburg',
    name: 'Parkersburg',
    county: 'Butler',
    population: '2,000+',
    description:
      'Landscaping, retaining walls, and lawn care in Parkersburg, IA. Professional service for your property.',
    heroEyebrow: 'Parkersburg \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Parkersburg, Iowa',
    heroSubtitle:
      'Dependable landscaping and hardscaping services for Parkersburg homeowners.',
    metaTitle: 'Landscaping in Parkersburg, IA | A1 Property Services',
    metaDescription:
      'Parkersburg IA landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for Parkersburg and Butler County properties.',
    metaKeywords: [
      'landscaping parkersburg ia',
      'parkersburg iowa landscaping',
      'landscaper parkersburg ia',
      'retaining wall parkersburg',
      'lawn care parkersburg iowa',
    ],
    introHeading: 'Parkersburg Landscaping, Built to Last',
    introBody: [
      'Parkersburg is a community that values hard work and reliability, and that is exactly what we bring to every landscaping project there. From retaining walls that handle the sloped Butler County terrain to paver patios designed for family gatherings, every job gets our full attention.',
    ],
    introBody2: [
      'We serve Parkersburg with the same experienced crews and quality equipment that we use across the Cedar Valley. Whether you need a complete landscape overhaul or just regular lawn maintenance, we are ready to help.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for Parkersburg homeowners.',
    uniqueContent: {
      heading: 'Professional Landscaping in Parkersburg',
      body: 'Parkersburg homeowners want their properties to look their best, and we help them get there. Clear communication, fair pricing, and quality work. That is how we have built our reputation across Butler County.',
    },
    faqs: [
      {
        q: 'Does A1 Property Services serve Parkersburg, IA?',
        a: 'Yes. We provide landscaping, hardscaping, and lawn care services to Parkersburg and all of Butler County.',
      },
      {
        q: 'What services do you offer in Parkersburg?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation and maintenance, drainage, and snow removal.',
      },
      {
        q: 'How do I schedule a consultation in Parkersburg?',
        a: 'Call us at (319) 464-1889 or fill out our online quote form. We provide free estimates for Parkersburg properties.',
      },
    ],
  },
  {
    slug: 'elk-run-heights',
    name: 'Elk Run Heights',
    county: 'Black Hawk',
    population: '1,200+',
    description:
      'Landscaping, retaining walls, and lawn care in Elk Run Heights, IA. Professional service for your property.',
    heroEyebrow: 'Elk Run Heights \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Elk Run Heights, Iowa',
    heroSubtitle:
      'Reliable landscaping and hardscaping services for Elk Run Heights homeowners and businesses.',
    metaTitle: 'Landscaping in Elk Run Heights, IA | A1 Property Services',
    metaDescription:
      'Elk Run Heights IA landscaping. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for Elk Run Heights properties.',
    metaKeywords: [
      'landscaping elk run heights ia',
      'elk run heights landscaping',
      'landscaper elk run heights',
      'retaining wall elk run heights',
      'lawn care elk run heights',
    ],
    introHeading: 'Elk Run Heights Landscaping, Local Crew',
    introBody: [
      'Elk Run Heights is a tight-knit Black Hawk County community, and we treat every landscaping job there like it is our own property. Retaining walls, paver patios, lawn care, and tree service. Same quality work we bring to every Cedar Valley job.',
    ],
    introBody2: [
      'We are just minutes from Elk Run Heights, so we can get there quickly when you need us. Regular mowing, spring cleanups, full landscape installations, and snow removal. Reliable service from a crew that knows the area.',
    ],
    servicesIntro:
      'Professional landscaping and hardscaping services for Elk Run Heights properties.',
    uniqueContent: {
      heading: 'Quality Landscaping in Elk Run Heights',
      body: 'Elk Run Heights homeowners want dependable service and solid results. That is what we deliver. Clear estimates, honest communication, and finished work that looks good and holds up. We take pride in our reputation here.',
    },
    faqs: [
      {
        q: 'Do you serve Elk Run Heights, IA?',
        a: 'Yes. A1 Property Services provides landscaping, hardscaping, and lawn care services to Elk Run Heights and the surrounding Black Hawk County area.',
      },
      {
        q: 'What services do you offer in Elk Run Heights?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation and maintenance, hydroseeding, and snow removal.',
      },
      {
        q: 'How do I schedule service in Elk Run Heights?',
        a: 'Call us at (319) 464-1889 or fill out our online form. We provide free estimates for Elk Run Heights properties and typically respond within 24 hours.',
      },
    ],
  },
  {
    slug: 'dunkerton',
    name: 'Dunkerton',
    county: 'Black Hawk',
    population: '1,000+',
    description:
      'Landscaping, retaining walls, and lawn care in Dunkerton, IA. Professional service for your property.',
    heroEyebrow: 'Dunkerton \u00b7 Iowa',
    heroTitle: 'Professional Landscaping|in Dunkerton, Iowa',
    heroSubtitle:
      'Dependable landscaping and hardscaping services for Dunkerton homeowners and properties.',
    metaTitle: 'Landscaping in Dunkerton, IA | A1 Property Services',
    metaDescription:
      'Dunkerton IA landscaping. Retaining walls, paver patios, lawn care, tree service and more. Free estimates for Dunkerton and Black Hawk County properties.',
    metaKeywords: [
      'landscaping dunkerton ia',
      'dunkerton iowa landscaping',
      'landscaper dunkerton ia',
      'retaining wall dunkerton',
      'lawn care dunkerton',
    ],
    introHeading: 'Dunkerton Landscaping You Can Count On',
    introBody: [
      'Dunkerton is a growing community in Black Hawk County, and homeowners here want landscaping that works for their property. We bring our full range of services: retaining walls for sloped lots, paver patios for backyard entertaining, regular lawn maintenance, and more.',
    ],
    introBody2: [
      'Whether you need a full landscape installation or just seasonal maintenance, our Dunkerton clients get the same quality work and reliable service we provide across the entire Cedar Valley. We show up on time and leave every property looking better than we found it.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Dunkerton homes.',
    uniqueContent: {
      heading: 'Professional Landscaping in Dunkerton',
      body: 'Dunkerton deserves professional landscaping work, and that is exactly what we deliver. From the initial consultation to the final walk-through, we communicate clearly and work efficiently so your project turns out right.',
    },
    faqs: [
      {
        q: 'Does A1 Property Services serve Dunkerton, IA?',
        a: 'Yes. We provide full landscaping, hardscaping, and lawn care services to Dunkerton and all of Black Hawk County.',
      },
      {
        q: 'What landscaping services do you offer in Dunkerton?',
        a: 'We offer retaining walls, paver patios, lawn care and mowing, tree service, landscape installation and maintenance, hydroseeding, and snow removal.',
      },
      {
        q: 'How do I get a free estimate in Dunkerton?',
        a: 'Call us at (319) 464-1889 or fill out our online quote form. We provide free estimates for all Dunkerton properties.',
      },
    ],
  },
]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}

export function getCityServiceFaqs(citySlug: string, serviceSlug: string): { q: string; a: string }[] {
  const city = getCityBySlug(citySlug)
  if (!city) return []
  return city.faqs
}

export function getCityImage(citySlug: string): string {
  return `/images/${citySlug}-hero.webp`
}
