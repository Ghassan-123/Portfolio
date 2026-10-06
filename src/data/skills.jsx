import {
    Code, BrainCircuit, Eye, MessageSquareText, LineChart, PenTool,
    Server, Smartphone, Cpu, GitBranch, Binary,
} from 'lucide-react';

// `tag` links a skill to project tags, so each card can show how many projects use it.
export const skillsData = {
    core: [
        {
            id: 'ai',
            tag: 'AI',
            nameEn: 'AI Engineering',
            nameAr: 'هندسة الذكاء الاصطناعي',
            descEn: 'End-to-end AI systems, from data and models to a product people actually use: expert systems, fuzzy logic, genetic algorithms and search, alongside modern deep learning.',
            descAr: 'بناء أنظمة ذكاء اصطناعي متكاملة من البيانات والنماذج حتى منتج يستخدمه الناس فعلاً: أنظمة خبيرة ومنطق ضبابي وخوارزميات جينية وبحث، إلى جانب التعلم العميق الحديث.',
            icon: <BrainCircuit size={26} />,
        },
        {
            id: 'cv',
            tag: 'Computer Vision',
            nameEn: 'Computer Vision',
            nameAr: 'الرؤية الحاسوبية',
            descEn: 'Real-time detection and tracking pipelines: YOLO fine-tuning with TensorRT, ByteTrack, homography, optical flow and Kalman filters, plus classical OpenCV (segmentation, morphology, HSV).',
            descAr: 'خطوط معالجة لحظية للكشف والتتبع: تدريب YOLO وتسريعه بـ TensorRT، وByteTrack، وHomography، والتدفق البصري، ومرشحات Kalman، إضافة إلى OpenCV الكلاسيكي (التقطيع والمورفولوجيا وHSV).',
            icon: <Eye size={26} />,
        },
        {
            id: 'llm',
            tag: 'LLM & NLP',
            nameEn: 'LLMs, RAG & NLP',
            nameAr: 'النماذج اللغوية وRAG ومعالجة اللغة',
            descEn: 'Retrieval-augmented generation with vector databases and re-ranking, multi-tenant chatbots grounded in each client\'s own facts, local LLMs through Ollama, and offline speech recognition, in Arabic and English.',
            descAr: 'التوليد المعزّز بالاسترجاع مع قواعد البيانات المتجهية وإعادة الترتيب، ومساعدات دردشة متعددة الجهات تجيب من معلومات كل جهة فقط، ونماذج لغوية محلية عبر Ollama، والتعرف على الكلام دون إنترنت، بالعربية والإنجليزية.',
            icon: <MessageSquareText size={26} />,
        },
        {
            id: 'ml',
            tag: 'Machine Learning',
            nameEn: 'Machine Learning & MLOps',
            nameAr: 'تعلم الآلة وMLOps',
            descEn: 'Feature engineering on messy data, gradient boosting (XGBoost, LightGBM), neural networks with TensorFlow and PyTorch, stratified validation, and reproducible experiments with MLflow and DVC.',
            descAr: 'هندسة الميزات على بيانات غير منظمة، وGradient Boosting (XGBoost وLightGBM)، والشبكات العصبية بـ TensorFlow وPyTorch، والتحقق الطبقي، وتجارب قابلة لإعادة الإنتاج عبر MLflow وDVC.',
            icon: <LineChart size={26} />,
        },
        {
            id: 'react',
            tag: 'React',
            nameEn: 'React Frontend',
            nameAr: 'تطوير الواجهات بـ React',
            descEn: 'Production dashboards, storefronts and marketing sites in React 19: state with Zustand, routing, maps (Leaflet), charts, drag-and-drop, i18n with full Arabic RTL, and smooth, responsive UI.',
            descAr: 'لوحات تحكم ومتاجر ومواقع تعريفية بـ React 19 للاستخدام الفعلي: إدارة الحالة بـ Zustand، والتوجيه، والخرائط (Leaflet)، والرسوم البيانية، والسحب والإفلات، وتعدد اللغات مع دعم كامل للعربية، وواجهات سلسة ومتجاوبة.',
            icon: <Code size={26} />,
        },
        {
            id: 'design',
            tag: 'Design',
            nameEn: 'UI/UX & Brand Design',
            nameAr: 'تصميم الواجهات والهوية البصرية',
            descEn: 'Designing interfaces and identities in Figma and Canva: logos, mascots and full website designs (Takeed, Alkhani Factory, Al Muthawroon Al Arab) that I then build myself.',
            descAr: 'تصميم الواجهات والهويات البصرية في Figma وCanva: شعارات وشخصيات تعريفية وتصاميم مواقع كاملة (Takeed، معمل الخاني، المثورون العرب) أنفّذها بنفسي بعد ذلك.',
            icon: <PenTool size={26} />,
        },
    ],
    familiar: [
        { id: 'laravel', tag: 'Laravel', name: 'Laravel & REST APIs', icon: <Server size={20} /> },
        { id: 'fastapi', name: 'FastAPI', icon: <Server size={20} /> },
        { id: 'algo', tag: 'Algorithms', name: 'Algorithms, Search & Parallel Computing', icon: <Binary size={20} /> },
        { id: 'flutter', tag: 'Mobile', name: 'Flutter & Mobile', icon: <Smartphone size={20} /> },
        { id: 'realtime', name: 'WebSockets & Socket.IO', icon: <Cpu size={20} /> },
        { id: 'figma', name: 'Figma & Canva', icon: <PenTool size={20} /> },
        { id: 'git', name: 'Git, GitHub & GitLab', icon: <GitBranch size={20} /> },
    ],
    // Tech chips, shown in the animated marquee.
    stack: [
        'Python', 'PyTorch', 'TensorFlow', 'YOLO', 'TensorRT', 'OpenCV', 'scikit-learn', 'XGBoost',
        'LightGBM', 'MLflow', 'ChromaDB', 'Ollama', 'Vosk', 'React 19', 'JavaScript', 'TypeScript',
        'Vite', 'Tailwind CSS', 'Zustand', 'Leaflet', 'Three.js', 'Electron', 'Laravel', 'FastAPI',
        'Node.js', 'Socket.IO', 'Flutter', 'Kotlin', 'C#', 'C++', 'MPI', 'Figma', 'Canva',
    ],
};
