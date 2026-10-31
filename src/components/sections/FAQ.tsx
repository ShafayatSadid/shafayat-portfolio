// src/components/sections/FAQ.tsx
"use client";

import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        question: "What kind of services do you offer?",
        answer: "I specialize in building full-stack web applications, including e-commerce platforms, content management systems (CMS), and custom business solutions. I handle everything from database design to frontend development.",
    },
    {
        question: "What is your preferred tech stack?",
        answer: "I primarily work with Next.js, React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB. I also have experience with tools like Better Auth, Stripe, and Cloudinary.",
    },
    {
        question: "How can I start a project with you?",
        answer: "You can reach out via the contact form or email me directly. We'll discuss your requirements, and I'll provide a detailed timeline and quote based on the project's scope.",
    },
    {
        question: "How long does a typical project take?",
        answer: "It depends on the complexity. A standard landing page might take 1-2 weeks, while a full-featured e-commerce platform can take 3-4 weeks. I'll give you an exact timeline before we start.",
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Yes, I offer 1 month of free bug-fixing support after deployment. For ongoing maintenance or new features, we can arrange a separate agreement.",
    },
    {
        question: "What are your payment terms?",
        answer: "I usually require a 30% advance payment to secure the project slot and start the work. The remaining 70% is due upon project completion and successful deployment.",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FAQ() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-24">
            {/* Header */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12 text-center"
            >
                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    FAQ
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                    Frequently Asked <span className="text-primary">Questions</span>
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Clear answers. No fluff. Here is everything you might need to know before we start working together.
                </p>
            </motion.div>

            {/* Accordion */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
            >
                <Accordion className="w-full space-y-4">
                    {FAQS.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="rounded-2xl border border-border bg-card px-6 shadow-sm transition-all hover:border-primary/50"
                        >
                            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5">
                                {/* এখানে নম্বর এবং প্রশ্ন একসাথে করা হয়েছে */}
                                <div className="flex items-center gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                                        0{index + 1}
                                    </span>
                                    <span>{faq.question}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-12">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.div>
        </section>
    );
}