document.addEventListener("DOMContentLoaded", function() {

  var thumb = document.getElementById("sidebar-thumb");
  var aside = document.querySelector("aside");

  var isDragging = false;
  var dragStartY = 0;
  var thumbPosition = 0;
  var dragStartTime = null;

  // Start page at the bottom
  window.scrollTo(0, document.body.scrollHeight);

  // Reverse mouse wheel
  window.addEventListener("wheel", function(e) {
    e.preventDefault();
    window.scrollBy(0, -e.deltaY);
  }, { passive: false });
function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
}


document.body.addEventListener('wheel', preventScroll, { passive: false });

  // Start drag
  thumb.addEventListener("mousedown", function(e) {
    isDragging = true;
    dragStartY = e.clientY;
    dragStartTime = Date.now(); // start the clock when drag begins
    e.preventDefault();
  });

  // Drag move
  document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;

    var dragDistance = e.clientY - dragStartY;
    dragStartY = e.clientY;

    // How long they have been dragging in seconds
    var secondsDragging = (Date.now() - dragStartTime) / 1000;

    // Normal for first 2 seconds, then grows after
    var multiplier;
    if (secondsDragging < 2) {
      multiplier = 3;
    } else {
      multiplier = 3 + (secondsDragging - 2) * 50;
    }

    // Move thumb
    thumbPosition = thumbPosition + dragDistance;
    var maxThumb = aside.clientHeight - thumb.clientHeight;
    thumbPosition = Math.max(0, Math.min(thumbPosition, maxThumb));
    thumb.style.transform = "translateY(" + thumbPosition + "px)";

    // Scroll with growing multiplier
    window.scrollBy(0, -dragDistance * multiplier);
  });

  // Stop drag
  document.addEventListener("mouseup", function() {
    isDragging = false;
    dragStartTime = null; // reset timer on release
  });

});