"use client";

import { useEffect, useRef } from "react";

interface HtmlRendererProps {
  html: string;
}

export default function HtmlRenderer({ html }: HtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a temporary container to parse the HTML
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = html;

    // Clear the container
    containerRef.current.innerHTML = "";

    // Extract and execute scripts
    const scripts = tempContainer.querySelectorAll("script");
    const executedScripts: HTMLScriptElement[] = [];

    // First, insert all non-script content
    while (tempContainer.firstChild) {
      if (tempContainer.firstChild.nodeName === "SCRIPT") {
        tempContainer.removeChild(tempContainer.firstChild);
      } else {
        containerRef.current.appendChild(tempContainer.firstChild);
      }
    }

    // Then, execute scripts in order
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      // Copy attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Copy script content
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }

      // Append to container to execute
      containerRef.current?.appendChild(newScript);
      executedScripts.push(newScript);
    });

    // Cleanup function
    return () => {
      // Remove executed scripts on unmount
      executedScripts.forEach((script) => {
        script.remove();
      });
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
