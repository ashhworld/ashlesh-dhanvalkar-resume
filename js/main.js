// Main JS for resume-site (extracted from inline handlers)
document.addEventListener('DOMContentLoaded', function () {
  var printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.print();
    });
  }

  // Ensure skill-bar-fill elements respect inline widths when animating
  var fills = document.querySelectorAll('.skill-bar-fill');
  fills.forEach(function (el) {
    var w = el.getAttribute('style');
    if (w && /width\s*:\s*\d+%/.test(w)) {
      // Keep width in style but also set transform to allow the grow animation
      // Do nothing else — animation defined in CSS will animate from scaleX(0) to scaleX(1)
    }
  });
});
