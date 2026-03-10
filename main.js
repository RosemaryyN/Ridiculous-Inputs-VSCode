document.addEventListener("DOMContentLoaded", function() {

  var content = document.querySelector(".content");
  var thumb = document.getElementById("sidebar-thumb");
  var aside = document.querySelector("aside");

  var isDragging = false;
  var dragStartY = 0;
  var thumbPosition = 0;
  var dragStartTime = null;

  // Start content at the top
  content.scrollTop = 0;

  // Set thumb to bottom
  setTimeout(function() {
    var maxThumbInit = aside.clientHeight - thumb.clientHeight;
    thumbPosition = maxThumbInit;
    thumb.style.transform = "translateY(" + thumbPosition + "px)";
  }, 50);

  // Block all trackpad/wheel scrolling — only thumb drag scrolls
  content.addEventListener("wheel", function(e) {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener("wheel", function(e) {
    e.preventDefault();
  }, { passive: false });

  // Start drag
  thumb.addEventListener("mousedown", function(e) {
    isDragging = true;
    dragStartY = e.clientY;
    dragStartTime = Date.now();
    e.preventDefault();
  });

  // Drag move
  document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;

    var dragDistance = e.clientY - dragStartY;
    dragStartY = e.clientY;


    var secondsDragging = (Date.now() - dragStartTime) / 1000;

    
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

    // Scroll content with multiplier (reversed)
    content.scrollBy(0, -dragDistance * multiplier);
  });

  // Stop drag
  document.addEventListener("mouseup", function() {
    isDragging = false;
    dragStartTime = null;
  });

});
