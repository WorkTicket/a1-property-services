export type City = {
  slug: string
  name: string
  county: string
  population: string
  description: string
  isCedarValley: boolean
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
    isCedarValley: true,
    heroEyebrow: 'Cedar Falls \u00b7 Iowa',
    heroTitle: 'Cedar Falls Landscaping|Local Crew',
    heroSubtitle:
      'Full-service landscaping, hardscaping, and lawn care for Cedar Falls homeowners since 2009.',
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
      'We\u2019re based here in Cedar Falls, so we know the soil, the drainage, and what grows in Black Hawk County. Weekly mowing, a full yard install, or emergency snow removal. We\u2019re your local crew.',
    ],
    servicesIntro:
      'We offer a full range of landscaping, hardscaping, and property services for Cedar Falls homeowners and businesses.',
    uniqueContent: {
      heading: 'Why Cedar Falls Homeowners Choose A1',
      body: 'Cedar Falls has its own character, from the historic neighborhoods near the college to the newer builds on the north end. We\u2019ve worked in all of them. Our crews show up on time, talk straight, and don\u2019t leave until the job is done right. That\u2019s kept us busy here for over 15 years.',
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
    isCedarValley: true,
    heroEyebrow: 'Waterloo \u00b7 Iowa',
    heroTitle: 'Waterloo Landscaping|Local Crew',
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
      'Landscaping and lawn care in Hudson, IA. We keep Hudson properties looking sharp year-round.',
    isCedarValley: true,
    heroEyebrow: 'Hudson \u00b7 Iowa',
    heroTitle: 'Hudson Lawn Care|and Landscaping',
    heroSubtitle:
      'Hudson is growing fast, and we are right there with you. New construction landscaping, lawn establishment, and ongoing maintenance from a crew that is minutes away.',
    metaTitle: 'Landscaping in Hudson, IA | A1 Property Services',
    metaDescription:
      'Looking for landscaping in Hudson, IA? A1 Property Services handles retaining walls, paver patios, lawn care, tree service, and more. Free estimates.',
    metaKeywords: [
      'hudson ia landscaping',
      'hudson iowa lawn care',
      'landscaper hudson',
      'hudson retaining walls',
      'hudson tree service',
      'new construction landscaping hudson',
    ],
    introHeading: 'Hudson Landscapers That Show Up',
    introBody: [
      'Hudson has seen a lot of new construction over the last several years, and we have been there for a lot of it. Fresh lots need grading, seeding, and planting. Established homes need seasonal cleanups and tree work. We do both, and we do them a few minutes up the road.',
    ],
    introBody2: [
      'Our trucks roll from Cedar Falls through Hudson every week. Regular mowing, spring and fall cleanups, paver patios, retaining walls. If your yard needs attention, we can get eyes on it fast.',
    ],
    servicesIntro:
      'Landscaping and hardscaping services for Hudson homes, from new builds to longtime properties.',
    uniqueContent: {
      heading: 'The Hudson Crew',
      body: 'What sets us apart in Hudson is proximity. We are close enough that a quote visit or last-minute service call is never a big deal. Hudson homeowners also tend to be particular about their properties, which suits us fine\u2014we are picky too.',
    },
    faqs: [
      {
        q: 'Do you work on new construction homes in Hudson?',
        a: 'Yes. We do a lot of new construction landscaping in Hudson. Grading, seeding, hydroseeding, sod, and bed installation. Call us before the builder hands off the lot so we can get the yard established right away.',
      },
      {
        q: 'How far in advance do I need to book spring cleanups in Hudson?',
        a: 'March and April fill up quick. Reach out in late winter to secure your spot. Existing maintenance customers get priority scheduling.',
      },
      {
        q: 'My Hudson yard is mostly clay. Can you work with that?',
        a: 'We deal with Black Hawk County clay on every job. Proper grading, amended topsoil, and the right plant selection make all the difference. We will walk you through what works for your specific lot.',
      },
    ],
  },
  {
    slug: 'evansdale',
    name: 'Evansdale',
    county: 'Black Hawk',
    population: '4,500+',
    description:
      'Landscaping and property services for Evansdale, IA. Residential and commercial.',
    isCedarValley: true,
    heroEyebrow: 'Evansdale \u00b7 Iowa',
    heroTitle: 'Evansdale Property|Maintenance',
    heroSubtitle:
      'Lawn mowing, tree trimming, retaining walls, and snow removal for Evansdale homes and businesses. Free quotes.',
    metaTitle: 'Landscaping in Evansdale, IA | A1 Property Services',
    metaDescription:
      'Evansdale landscaping company. Lawn care, retaining walls, paver patios, tree service, and snow removal for Evansdale, Gilbertville, and Black Hawk County.',
    metaKeywords: [
      'evansdale landscaping',
      'evansdale lawn care',
      'evansdale retaining walls',
      'landscaping evansdale ia',
      'evansdale snow removal',
    ],
    introHeading: 'Evansdale Landscaping That Fits',
    introBody: [
      'Evansdale sits right in the middle of everything, and we serve it like we serve our closest neighbors. Mowing, trimming, tree work, hardscaping. Whatever your property needs, we bring the same equipment and crew standards that work across the Cedar Valley.',
    ],
    introBody2: [
      'Busy schedule and just need someone to keep the lawn in shape through the summer? We handle weekly mowing for a lot of Evansdale homeowners. Need a full yard redesign? We do that too.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for Evansdale properties.',
    uniqueContent: {
      heading: 'No-Nonsense Service in Evansdale',
      body: 'We have been working in Evansdale long enough to know the area well. The lots here are practical\u2014established trees, moderate slopes, and homeowners who want results without the sales pitch. Straightforward work, fair pricing, done right.',
    },
    faqs: [
      {
        q: 'Do you offer weekly lawn mowing in Evansdale?',
        a: 'Yes. Weekly and biweekly mowing schedules are available. We handle trimming, blowing, and weed control as part of our maintenance plans.',
      },
      {
        q: 'Can you handle commercial properties in Evansdale?',
        a: 'We maintain several commercial accounts in Evansdale. Mowing, pruning, snow removal, and general property upkeep. Call us for a commercial proposal.',
      },
      {
        q: 'How do I get a quote for hardscaping in Evansdale?',
        a: 'Call (319) 464-1889 or fill out our online form. We will come out, look at the space, and give you a written estimate within 24 hours.',
      },
    ],
  },
  {
    slug: 'waverly',
    name: 'Waverly',
    county: 'Bremer',
    population: '10,400+',
    description:
      'Full-service landscaping, retaining walls, and paver patios in Waverly, IA.',
    isCedarValley: true,
    heroEyebrow: 'Waverly \u00b7 Iowa',
    heroTitle: 'Waverly Landscaping|and Hardscaping',
    heroSubtitle:
      'Serving Waverly homeowners and businesses with full landscaping, hardscaping, lawn care, and snow removal.',
    metaTitle: 'Landscaping in Waverly, IA | A1 Property Services',
    metaDescription:
      'Waverly IA landscaping company. Retaining walls, paver patios, lawn care, tree service. Licensed and insured. Free estimates for Bremer County.',
    metaKeywords: [
      'waverly ia landscaping',
      'waverly retaining walls',
      'waverly paver patios',
      'lawn care waverly iowa',
      'landscaper waverly',
      'bremer county landscaping',
    ],
    introHeading: 'Landscaping across Waverly',
    introBody: [
      'Waverly has a mix of older historic homes near downtown and newer developments pushing out toward the edges of town. We work in both. Retaining walls are common on the sloped lots near the river. Paver patios are popular in the newer neighborhoods. Lawn care is something almost every homeowner needs.',
    ],
    introBody2: [
      'We are based in Cedar Falls but run routes to Waverly multiple times a week during the growing season. That means we can get a crew on your property without long lead times.',
    ],
    servicesIntro:
      'Residential and commercial landscaping services for Waverly and Bremer County.',
    uniqueContent: {
      heading: 'A1 in Waverly',
      body: 'Waverly is big enough to have its own character and growing fast enough to keep us busy. We treat every job there the same way: assess the site, give a clear price, do the work, and make sure you are happy before we roll out.',
    },
    faqs: [
      {
        q: 'Do you install retaining walls on sloped Waverly lots?',
        a: 'Yes. We build segmental retaining walls using Keystone and Versa-Lok systems. We handle drainage behind the wall so you do not get water issues down the road.',
      },
      {
        q: 'What is the best time to seed a new lawn in Waverly?',
        a: 'Late summer to early fall is ideal for cool-season grasses in Bremer County. Spring is second best. We also offer hydroseeding for larger areas.',
      },
      {
        q: 'Do you serve all of Waverly?',
        a: 'Yes. Downtown, the historic district, the developments on the north and south ends, and commercial properties throughout the city.',
      },
    ],
  },
  {
    slug: 'denver',
    name: 'Denver',
    county: 'Bremer',
    population: '1,900+',
    description:
      'Lawn care, landscaping, and hardscaping for Denver, IA. Small town, solid work.',
    isCedarValley: true,
    heroEyebrow: 'Denver \u00b7 Iowa',
    heroTitle: 'Denver Landscaping|and Maintenance',
    heroSubtitle:
      'Denver homeowners trust us for lawn mowing, retaining walls, paver patios, and tree service. Free estimates.',
    metaTitle: 'Landscaping in Denver, IA | A1 Property Services',
    metaDescription:
      'Denver IA landscaping. Retaining walls, paver patios, lawn care, tree service, and property maintenance. Free estimates for Denver and Bremer County.',
    metaKeywords: [
      'denver ia landscaping',
      'denver iowa lawn care',
      'denver retaining walls',
      'denver tree service',
      'landscaper denver ia',
    ],
    introHeading: 'Denver Landscaping. No Detours.',
    introBody: [
      'Denver is the kind of town where people know each other, and your yard is part of your reputation. We take that seriously. Need a retaining wall replaced, a patio put in, or just someone reliable to keep the grass cut? We can help.',
    ],
    introBody2: [
      'We run through Denver regularly during the season. A quick call gets you on the schedule without a hassle.',
    ],
    servicesIntro:
      'Professional landscaping and hardscaping services for Denver homeowners.',
    uniqueContent: {
      heading: 'Bringing Cedar Valley Quality to Denver',
      body: 'Denver may be small, but the work we do there is held to the same standard as our biggest Cedar Falls projects. Good materials, proper installation, crews that care about the finished look. Word travels fast in a small town, and we want the word to be good.',
    },
    faqs: [
      {
        q: 'Do you come to Denver for small jobs?',
        a: 'Yes. If it is yard work, we do it. Mowing, trimming, mulching, seeding, tree trimming. No job is too small if it is in our service area.',
      },
      {
        q: 'My retaining wall in Denver is bowing. Can you replace it?',
        a: 'We can. We tear out failing walls, prep the base properly, and install a new system that will handle freeze-thaw cycles without shifting.',
      },
      {
        q: 'How do I get on the schedule in Denver?',
        a: 'Call (319) 464-1889 or fill out our online quote form. We will get back to you within 24 hours.',
      },
    ],
  },
  {
    slug: 'jesup',
    name: 'Jesup',
    county: 'Buchanan',
    population: '2,900+',
    description:
      'Landscaping, hardscaping, and lawn care in Jesup, IA, and Buchanan County.',
    isCedarValley: true,
    heroEyebrow: 'Jesup \u00b7 Iowa',
    heroTitle: 'Jesup Landscaping|Services',
    heroSubtitle:
      'Lawn maintenance, retaining walls, paver patios, and tree service for Jesup homes and businesses.',
    metaTitle: 'Landscaping in Jesup, IA | A1 Property Services',
    metaDescription:
      'Jesup IA landscaping. Retaining walls, paver patios, lawn care, tree service, and snow removal. Free estimates for Jesup and Buchanan County properties.',
    metaKeywords: [
      'jesup ia landscaping',
      'jesup lawn care',
      'jesup retaining wall',
      'landscaper jesup',
      'jesup tree service',
      'buchanan county landscaping',
    ],
    introHeading: 'Jesup Landscaping, Buchanan County',
    introBody: [
      'Jesup sits right on the Black Hawk-Buchanan county line, and we serve it the same way we serve the rest of the Cedar Valley. Retaining walls, paver patios, lawn care, and tree service. Jesup homeowners get the same quality, same pricing, and same crew.',
    ],
    introBody2: [
      'We have done everything in Jesup from full yard installations to simple weekly mowing. If your property needs work, we can handle it.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Jesup homes and businesses.',
    uniqueContent: {
      heading: 'Why Jesup?',
      body: 'Jesup sits at a crossroads, and we have been covering it for years. Homeowners there want reliable work and fair pricing. That is our specialty. We lay out what needs to happen, quote it honestly, and deliver on schedule.',
    },
    faqs: [
      {
        q: 'How long have you been working in Jesup?',
        a: 'We have served Jesup for over a decade. Many of our clients there are referrals from neighbors who have used us for years.',
      },
      {
        q: 'Do you do drainage work in Jesup?',
        a: 'Yes. Jesup properties can have drainage issues after heavy rain. French drains, downspout extensions, and grading corrections are common fixes we handle regularly.',
      },
      {
        q: 'Can you quote a paver patio in Jesup?',
        a: 'Absolutely. Call us or fill out the form and we will come measure the space, discuss material options, and give you a firm price.',
      },
    ],
  },
  {
    slug: 'parkersburg',
    name: 'Parkersburg',
    county: 'Butler',
    population: '2,000+',
    description:
      'Landscaping, retaining walls, and lawn care in Parkersburg, IA. Built Butler County tough.',
    isCedarValley: true,
    heroEyebrow: 'Parkersburg \u00b7 Iowa',
    heroTitle: 'Parkersburg Landscaping|Done Right',
    heroSubtitle:
      'Retaining walls, paver patios, lawn care, and property maintenance for Parkersburg and Butler County.',
    metaTitle: 'Landscaping in Parkersburg, IA | A1 Property Services',
    metaDescription:
      'Parkersburg IA landscaping. Retaining walls, paver patios, lawn care, tree service, and more. Serving Parkersburg and Butler County. Free estimates.',
    metaKeywords: [
      'parkersburg landscaping',
      'parkersburg ia lawn care',
      'parkersburg retaining wall',
      'butler county landscaping',
      'landscaper parkersburg',
    ],
    introHeading: 'Landscaping for Parkersburg Properties',
    introBody: [
      'Parkersburg is a community that knows the value of solid work. After everything this town has rebuilt, homeowners here do not settle for less than what lasts. That is exactly the kind of work we do. Retaining walls with proper drainage, patios on compacted base, and trees planted to thrive in Butler County soil.',
    ],
    introBody2: [
      'We serve Parkersburg year-round. Mowing and maintenance through the summer, leaf cleanup in the fall, snow removal in the winter, and new installations in the spring.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for Parkersburg homeowners.',
    uniqueContent: {
      heading: 'Work That Holds Up',
      body: 'Parkersburg residents do not have time for callbacks or shoddy work. Neither do we. We build hardscapes that survive freeze-thaw cycles, install plants suited to the local climate, and keep properties looking clean and professional all year.',
    },
    faqs: [
      {
        q: 'Do you do snow removal in Parkersburg?',
        a: 'Yes. We provide commercial and residential snow plowing and shoveling in Parkersburg. Seasonal contracts available.',
      },
      {
        q: 'What kind of retaining walls do you install?',
        a: 'We install segmental retaining wall blocks that interlock and handle heavy loads. Clean, straight lines with drainage aggregate behind the wall.',
      },
      {
        q: 'How do I start a landscaping project in Parkersburg?',
        a: 'Call (319) 464-1889 or submit the online form. We will come take a look, talk through your options, and give you a written estimate.',
      },
    ],
  },
  {
    slug: 'la-porte-city',
    name: 'La Porte City',
    county: 'Black Hawk',
    population: '2,200+',
    description:
      'Landscaping, lawn care, and hardscaping in La Porte City, IA. Quality work, fair price.',
    isCedarValley: true,
    heroEyebrow: 'La Porte City \u00b7 Iowa',
    heroTitle: 'La Porte City|Landscaping Services',
    heroSubtitle:
      'Lawn care, retaining walls, paver patios, and tree service for La Porte City homeowners.',
    metaTitle: 'Landscaping in La Porte City, IA | A1 Property Services',
    metaDescription:
      'La Porte City IA landscaping. Retaining walls, paver patios, lawn care, tree service, and snow removal. Free estimates for La Porte City properties.',
    metaKeywords: [
      'la porte city landscaping',
      'la porte city lawn care',
      'la porte city retaining walls',
      'landscaper la porte city',
      'la porte city ia landscaping',
    ],
    introHeading: 'La Porte City Landscaping You Can Count On',
    introBody: [
      'La Porte City has a strong local identity, and we respect that. When we work there, we treat each property like it is in our own neighborhood. Retaining walls, paver patios, lawn care, and tree service. Same equipment, same crew, same standard.',
    ],
    introBody2: [
      'We run regular routes through La Porte City during the season. New projects or ongoing maintenance, we can fit you in.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for La Porte City homeowners.',
    uniqueContent: {
      heading: 'Bringing Professional Landscaping to La Porte City',
      body: 'La Porte City homeowners want clear communication and solid execution. We give them both. We walk the property with you, explain what we recommend and why, then deliver it on time and on budget.',
    },
    faqs: [
      {
        q: 'Do you provide hydroseeding in La Porte City?',
        a: 'Yes. Hydroseeding is a great option for establishing new lawns on larger lots. We can do it in La Porte City as part of a full yard install or on its own.',
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
      'Lawn care, landscaping, and hardscaping for Dike, IA, and Grundy County.',
    isCedarValley: true,
    heroEyebrow: 'Dike \u00b7 Iowa',
    heroTitle: 'Dike Landscaping|and Lawn Care',
    heroSubtitle:
      'Retaining walls, paver patios, mowing, and seasonal maintenance for Dike homeowners.',
    metaTitle: 'Landscaping in Dike, IA | A1 Property Services',
    metaDescription:
      'Dike IA landscaping. Retaining walls, paver patios, lawn care, tree service, and more. Serving Grundy County. Free estimates.',
    metaKeywords: [
      'dike ia landscaping',
      'dike lawn care',
      'dike retaining walls',
      'grundy county landscaping',
      'landscaper dike',
    ],
    introHeading: 'Dike Landscaping Since 2009',
    introBody: [
      'Dike homeowners want their yards looking good without having to chase contractors. We make it easy. One call gets you on the schedule for mowing, trimming, seasonal cleanups, or a full hardscape project. We handle the details so you do not have to.',
    ],
    introBody2: [
      'Grundy County soil is different from Black Hawk, and we account for that in every job we do there. Proper amendments, the right plants, and base prep that holds up.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Dike and Grundy County.',
    uniqueContent: {
      heading: 'Professional Landscaping in Dike',
      body: 'Dike may be one of the smaller communities we serve, but the work we do there gets the same attention as our biggest projects. Good work is good work, no matter the zip code.',
    },
    faqs: [
      {
        q: 'Do you travel to Dike from Cedar Falls?',
        a: 'Yes. We cover Grundy County as part of our regular service area. Dike is about 20 minutes from our shop, and we run routes there weekly.',
      },
      {
        q: 'What is the most common project you do in Dike?',
        a: 'Lawn maintenance is the most frequent, but we also do a lot of retaining wall and patio work for Dike homeowners looking to upgrade their outdoor space.',
      },
      {
        q: 'How can I get a quote for my Dike property?',
        a: 'Call us at (319) 464-1889 or fill out our online form. We provide free estimates for Dike properties.',
      },
    ],
  },
  {
    slug: 'elk-run-heights',
    name: 'Elk Run Heights',
    county: 'Black Hawk',
    population: '1,200+',
    description:
      'Landscaping and property maintenance for Elk Run Heights, IA. Quick, local, reliable.',
    isCedarValley: true,
    heroEyebrow: 'Elk Run Heights \u00b7 Iowa',
    heroTitle: 'Elk Run Heights|Property Services',
    heroSubtitle:
      'Mowing, tree work, retaining walls, and snow removal for Elk Run Heights. Free estimates.',
    metaTitle: 'Landscaping in Elk Run Heights, IA | A1 Property Services',
    metaDescription:
      'Elk Run Heights IA landscaping. Lawn care, retaining walls, tree service, and snow removal. Free estimates for Elk Run Heights properties.',
    metaKeywords: [
      'elk run heights landscaping',
      'elk run heights lawn care',
      'elk run heights retaining walls',
      'landscaper elk run heights',
      'elk run heights snow removal',
    ],
    introHeading: 'Elk Run Heights Landscaping, Local Crew',
    introBody: [
      'Elk Run Heights is a small community right off the highway, and we pass through it every day. That makes it easy to keep properties looking their best without long waits or scheduling headaches. Mowing, trimming, hardscaping, tree service. Whatever you need.',
    ],
    introBody2: [
      'We can get a crew to Elk Run Heights fast for estimates, service calls, or ongoing maintenance. If your property needs attention, let us know.',
    ],
    servicesIntro:
      'Professional landscaping and hardscaping services for Elk Run Heights properties.',
    uniqueContent: {
      heading: 'Quality Landscaping in Elk Run Heights',
      body: 'Elk Run Heights homeowners want dependable service and solid results. That is what we deliver. Clear estimates, honest communication, and finished work that looks good and holds up.',
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
      'Landscaping, lawn care, and hardscaping in Dunkerton, IA. Small town, big results.',
    isCedarValley: true,
    heroEyebrow: 'Dunkerton \u00b7 Iowa',
    heroTitle: 'Dunkerton Property|Services',
    heroSubtitle:
      'Lawn care, retaining walls, paver patios, and snow removal for Dunkerton homeowners.',
    metaTitle: 'Landscaping in Dunkerton, IA | A1 Property Services',
    metaDescription:
      'Dunkerton IA landscaping. Retaining walls, lawn care, tree service, paver patios, and snow removal. Free estimates for Dunkerton and Black Hawk County.',
    metaKeywords: [
      'dunkerton landscaping',
      'dunkerton lawn care',
      'dunkerton retaining walls',
      'landscaper dunkerton',
      'dunkerton ia landscaping',
    ],
    introHeading: 'Dunkerton Landscaping, No Runaround',
    introBody: [
      'Dunkerton is a quiet Black Hawk County town where people take pride in their properties. We help keep them that way. Mowing, trimming, retaining walls, paver patios, tree work. Same quality, same fair pricing, whether it is a weekly mow or a full yard redo.',
    ],
    introBody2: [
      'We cover Dunkerton as part of our regular service area. Ongoing maintenance plans or one-off projects, we are happy to quote your work.',
    ],
    servicesIntro:
      'Complete landscaping and hardscaping services for Dunkerton homes.',
    uniqueContent: {
      heading: 'Professional Landscaping in Dunkerton',
      body: 'Dunkerton is a close community, and we treat every job there with care. Clear communication, fair pricing, and work that holds up through Iowa seasons. That is how we have built our reputation across Black Hawk County.',
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
  {
    slug: 'cedar-rapids',
    name: 'Cedar Rapids',
    county: 'Linn',
    population: '135,000+',
    description:
      'Professional landscaping, retaining walls, paver patios, and lawn care in Cedar Rapids, IA.',
    isCedarValley: false,
    heroEyebrow: 'Cedar Rapids \u00b7 Iowa',
    heroTitle: 'Cedar Rapids Landscaping|Local Crew',
    heroSubtitle:
      'Full-service landscaping, hardscaping, and lawn care for Cedar Rapids homes and businesses.',
    metaTitle: 'Landscaping in Cedar Rapids, IA | A1 Property Services',
    metaDescription:
      'Cedar Rapids landscaping company. Retaining walls, paver patios, lawn care, tree service. Licensed and insured. Free estimates.',
    metaKeywords: [
      'landscaping cedar rapids',
      'cedar rapids landscaping',
      'landscaper cedar rapids ia',
      'retaining wall cedar rapids',
      'paver patio cedar rapids',
      'lawn care cedar rapids',
      'hardscaping cedar rapids',
    ],
    introHeading: 'Cedar Rapids Landscaping for Your Property',
    introBody: [
      'Cedar Rapids is a big city with a wide range of properties\u2014from the established neighborhoods near the river to growing suburbs on the outskirts. We bring our full landscaping and hardscaping services to every part of it. Retaining walls, paver patios, lawn care, and tree service, handled by crews that know Iowa soil.',
    ],
    introBody2: [
      'Residential and commercial. New builds and longtime homes. We treat every Cedar Rapids property with the same standard: proper materials, honest communication, and work that lasts.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for Cedar Rapids homeowners and commercial properties.',
    uniqueContent: {
      heading: 'Reliable Landscaping Across Cedar Rapids',
      body: 'Cedar Rapids has real variety in its neighborhoods, from the trees near Mt. Mercy to the newer developments out by the interstate. Every job gets the same attention: proper base prep on hardscape, clean bed edges, and we keep you informed throughout the project.',
    },
    faqs: [
      {
        q: 'Do you serve all of Cedar Rapids?',
        a: 'Yes. We serve Cedar Rapids and the surrounding Linn County area including all residential neighborhoods and commercial zones.',
      },
      {
        q: 'Can you handle commercial landscaping in Cedar Rapids?',
        a: 'Yes. We provide landscape maintenance, snow removal, and hardscaping for commercial properties in Cedar Rapids. Contact us for a commercial quote.',
      },
      {
        q: 'How quickly can you start my landscaping project in Cedar Rapids?',
        a: 'Spring and fall fill up fast. We recommend contacting us early to get on the schedule. We typically begin projects within 1-2 weeks of signing.',
      },
      {
        q: 'Do you offer free estimates for Cedar Rapids properties?',
        a: 'Yes. We provide free, no-obligation estimates for all Cedar Rapids properties. Call (319) 464-1889 or fill out our online form to schedule yours.',
      },
    ],
  },
  {
    slug: 'des-moines',
    name: 'Des Moines',
    county: 'Polk',
    population: '210,000+',
    description:
      'Professional landscaping, retaining walls, paver patios, and lawn care in Des Moines, IA.',
    isCedarValley: false,
    heroEyebrow: 'Des Moines \u00b7 Iowa',
    heroTitle: 'Des Moines Landscaping|Local Crew',
    heroSubtitle:
      'Full-service landscaping, hardscaping, and lawn care for Des Moines homeowners and businesses.',
    metaTitle: 'Landscaping in Des Moines, IA | A1 Property Services',
    metaDescription:
      'Des Moines landscaping company. Retaining walls, paver patios, lawn care, tree service and more. Licensed and insured. Free estimates for Des Moines properties.',
    metaKeywords: [
      'landscaping des moines',
      'des moines landscaping',
      'landscaper des moines ia',
      'retaining wall des moines',
      'paver patio des moines',
      'lawn care des moines',
      'hardscaping des moines',
    ],
    introHeading: 'Des Moines Landscaping for Your Property',
    introBody: [
      'Des Moines is the largest city in Iowa with every type of property you can imagine. Established historic districts, new suburban developments, commercial corridors, and everything between. We bring our landscaping services across the metro: retaining walls, paver patios, lawn care, tree service, and seasonal maintenance.',
    ],
    introBody2: [
      'Residential lawns and commercial properties. Full yard installs and ongoing mowing. Our crews are experienced with Polk County conditions and treat every Des Moines job with the same attention to detail.',
    ],
    servicesIntro:
      'Full landscaping and hardscaping services for Des Moines homeowners and commercial properties.',
    uniqueContent: {
      heading: 'Landscaping in Des Moines',
      body: 'Des Moines properties vary block to block, and we like that. Tight city lots near downtown, sprawling suburban yards, commercial storefronts. Every job gets proper base prep, clean finished edges, and clear communication from start to finish.',
    },
    faqs: [
      {
        q: 'Do you serve all of Des Moines?',
        a: 'Yes. We serve Des Moines and the surrounding Polk County area including all neighborhoods and commercial districts.',
      },
      {
        q: 'Can you handle commercial landscaping in Des Moines?',
        a: 'Yes. We provide landscape maintenance, snow removal, and hardscaping for commercial properties in Des Moines. Contact us for a commercial quote.',
      },
      {
        q: 'How quickly can you start my landscaping project in Des Moines?',
        a: 'Spring and fall fill up fast. We recommend contacting us early to get on the schedule. We typically begin projects within 1-2 weeks of signing.',
      },
      {
        q: 'Do you offer free estimates for Des Moines properties?',
        a: 'Yes. We provide free, no-obligation estimates for all Des Moines properties. Call (319) 464-1889 or fill out our online form to schedule yours.',
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
