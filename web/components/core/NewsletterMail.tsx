"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NewsletterMail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "newsletter",
          email: user?.emailAddresses[0]?.emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to perform action");
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while performing the action");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-card rounded-lg flex flex-col items-center text-center">
      <Send className="text-blue-500 h-12 w-12 mb-4 text-primary " />
      <h3 className="font-medium mb-2 text-foreground text-xl">
        Send Newsletter
      </h3>
      <p className="text-muted-foreground mb-4 text-balance">
        This button is like adding up in a subscrition list for newsletter or
        some particular thing. This could also work for unsubscribing from it.
      </p>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          
            <TooltipTrigger>
              <button
                onClick={handleAction}
                disabled={isLoading}
                className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 active:scale-95 transition-transform shadow-lg"
              >
                {isLoading ? "Sending..." : "Send Newsletter"}
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black px-2 py-1 w-80 text-balance text-md">
              {" "}
                Clicking this is going to send you a newsletter with a list of some programming principles generated by AI.  
            </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
