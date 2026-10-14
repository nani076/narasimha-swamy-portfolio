// Set this only after the actual Medical Image Fusion repository URL is verified.
export const medicalImageFusionRepositoryUrl = '';

export const projects = [
  {
    title:'Personal Developer Portfolio',
    category:'Frontend Web Development',
    status:'Completed — Live',
    description:'Designed and developed a modern, responsive personal portfolio website to showcase my technical skills, academic projects, education, and career interests in Python Full Stack Development and Data Analytics. The portfolio features a minimalist black-and-white design, smooth animations, interactive navigation, responsive layouts, and reusable React components.',
    tech:['React','JavaScript','Tailwind CSS','Vite','Framer Motion','Lucide React','HTML5','CSS3'],
    features:['Responsive portfolio website and mobile-friendly layouts','Interactive navigation across Home, About, Skills, Projects, and Contact','Smooth animations and professional hero section','Custom portrait presentation','Reusable React components','Functional PDF resume download','Functional contact form powered by Formspree'],
    preview:'portfolio',screenshot:null,
    repository:'https://github.com/nani076/narasimha-swamy-portfolio',
    repositoryLabel:'View Source Code',
    demo:'https://nanichportfolio.vercel.app',
    demoLabel:'View Live Website'
  },
  {title:'Medical Image Fusion Using Image Processing Techniques',category:'FEATURED PROJECT / PYTHON + DJANGO',description:'An image processing workflow that brings multimodal medical images together through a Django web interface.',tech:['Python','Django','HTML','CSS','NumPy','SciPy','OpenCV','pydicom','nibabel','scikit-image'],features:['Medical image upload','Multimodal image processing','Image fusion workflow','Results visualization','Django web interface'],screenshot:null,repository:medicalImageFusionRepositoryUrl,demo:null}
];
export const futureProjects = ['Student Management System','Sales Data Analytics Dashboard','Employee Management REST API'];
