---
tags:
  - real
---

<!-- 1. Use the clean public web route instead of the local content/ folder path -->
<object id="concept-map" type="image/svg+xml" data="/icmexca.svg" style="width: 100%; height: 600px; border: 1px solid var(--lightgray);"></object>

<script type="module">
  // Corrected full CDN URL for the pan-zoom library
  import svgPanZoom from "https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.es.js";

  function initPanZoom() {
    const svgObject = document.getElementById('concept-map');
    
    if (!svgObject) return;

    // Initialize the pan and zoom interface
    const panZoomInstance = svgPanZoom('#concept-map', {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: true,
      center: true
    });

    // Fix the links: Peeks inside the SVG and intercepts Obsidian links
    const svgDoc = svgObject.contentDocument;
    if (svgDoc) {
      const links = svgDoc.querySelectorAll('a');
      links.forEach(link => {
        const currentHref = link.getAttribute('href') || '';
        
        // Check for Obsidian links
        if (currentHref.includes('obsidian://') || currentHref.includes('[[')) {
          let pageTarget = '';
          
          if (currentHref.includes('file=')) {
            const urlParams = new URLSearchParams(currentHref.split('?')[1]);
            pageTarget = urlParams.get('file') || '';
          } else {
            pageTarget = currentHref.replace(/[\[\]]/g, '').split('|')[0].trim();
          }

          if (pageTarget) {
            // Convert to Quartz web route: lowercase and hyphenated
            const webRoute = '/' + decodeURIComponent(pageTarget).toLowerCase().replace(/\s+/g, '-');
            
            link.setAttribute('href', webRoute);
            link.setAttribute('target', '_top'); // Prevents page from loading inside the SVG box
          }
        }
      });
    }
  }

  // Execute after the document layer fully settles
  window.addEventListener('load', () => {
    setTimeout(initPanZoom, 500); 
  });
</script>
