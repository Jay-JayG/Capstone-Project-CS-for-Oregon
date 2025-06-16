import { useEffect, useRef } from "react";
import "./TableauEmbed.css";

const TableauEmbed = () => {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;
    script.onload = () => {
      const vizElement = ref.current.querySelector("object");
      if (vizElement) {
        vizElement.style.display = "block"; // Only necessary to ensure block layout
      }
    };
    ref.current.appendChild(script);
  }, []);

  return (
    <div
      ref={ref}
      className="tableau-container"
      id="vizEmbed"
    >
      <noscript>
        <a href="#">
          <img
            alt="Access"
            src="https://public.tableau.com/static/images/CM/CMP_OR_8_26_24/Access/1_rss.png"
            style={{ border: "none" }}
          />
        </a>
      </noscript>
      <object className="tableauViz">
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="CMP_OR_8_26_24/Access" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="static_image" value="https://public.tableau.com/static/images/CM/CMP_OR_8_26_24/Access/1.png" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
      </object>
    </div>
  );
};

export default TableauEmbed;