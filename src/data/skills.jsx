import React from 'react';
import {
    Code, BrainCircuit, Wand2, Database,
    Server, Globe, Smartphone, PenTool
} from 'lucide-react';

export const skillsData = {
    core: [
        {
            id: 'frontend',
            nameEn: "Frontend (ReactJS, HTML, JS, CSS Modules)",
            nameAr: "تطوير الواجهات (ReactJS, HTML, JS, CSS Modules)",
            descEn: "Architecting and developing highly responsive, scalable Single Page Applications with modern functional components, complex state management, and elegant UI.",
            descAr: "هندسة وتطوير تطبيقات ويب سريعة الاستجابة وقابلة للتطوير باستخدام المكونات الوظيفية وإدارة الحالة المعقدة.",
            icon: <Code size={24} className="text-cyan-500" />
        },
        {
            id: 'ai_cv',
            nameEn: "AI & Computer Vision",
            nameAr: "الذكاء الاصطناعي والرؤية الحاسوبية",
            descEn: "Designing object detection, tracking, and pure CV pipelines using YOLO, Homography, SIFT/ORB, and morphological transformations.",
            descAr: "تصميم خطوط أنابيب اكتشاف وتتبع الكائنات باستخدام YOLO، وHomography، وSIFT/ORB، والتحويلات المورفولوجية.",
            icon: <BrainCircuit size={24} className="text-teal-400" />
        },
        {
            id: 'llm',
            nameEn: "Large Language Models (LLMs)",
            nameAr: "نماذج اللغة الكبيرة (LLMs)",
            descEn: "Integrating, prompting, and fine-tuning generative AI models for automated reasoning, content generation, and intelligent chatbots.",
            descAr: "دمج وتوجيه وضبط نماذج الذكاء الاصطناعي التوليدي للاستدلال الآلي وإنشاء المحتوى.",
            icon: <Wand2 size={24} className="text-emerald-400" />
        },
        {
            id: 'rag',
            nameEn: "NLP & RAG Systems",
            nameAr: "معالجة اللغات الطبيعية و RAG",
            descEn: "Developing Knowledge Base Retrieval-Augmented Generation (RAG) systems to semantically query and analyze extensive document datasets.",
            descAr: "تطوير أنظمة توليد معزز بالاسترجاع للاستعلام الدلالي عن مجموعات المستندات الواسعة وتحليلها.",
            icon: <Database size={24} className="text-cyan-400" />
        }
    ],
    familiar: [
        { id: 'laravel', name: "Laravel Backend", icon: <Server size={24} /> },
        { id: 'rest', name: "RESTful APIs", icon: <Globe size={24} /> },
        { id: 'flutter', name: "Flutter", icon: <Smartphone size={24} /> },
        { id: 'figma', name: "Figma (UI & Logo)", icon: <PenTool size={24} /> }
    ]
};