// Up arrow icon component in order to scroll to the top of the page
'use client'

import React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UpArrow = () => {
    return (
        <Button
            variant="humaeButtonTop"
            aria-label="Revenir en haut de la page"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <ArrowUp className="h-6 w-6 text-gray-600" />
        </Button>
    );
};
