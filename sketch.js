window.addEventListener("load", function() {
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function() {
      if (this.files && this.files[0]) {
        var img = document.querySelector("img");
        img.src = URL.createObjectURL(this.files[0]);

        const rst = document.querySelector("#reset");
        document
          .querySelector("#vradius")
          .addEventListener("keypress", function(e) {
            var key = e.which || e.keyCode;
            const valx = document.querySelector("#vradius");
            if (key === 13) {
              if (valx.value == 0 || valx.value == "") {
                return false;
              } else {
                let getval = valx.value;
                easyBlur({
                  canvasId: "canvas",
                  CORS: true,
                  imgUrl: img.src,
                  vradius: getval
                });
                const before = (document.querySelector("#before").innerHTML =
                  "Sebelum Diberi Filter Gaussian Blur");
                const after = (document.querySelector("#after").innerHTML =
                  "Sesudah Diberi Filter Gaussian Blur");
              }
              event.preventDefault();
              event.currentTarget.value = "";
            } else if (key) {
              rst.addEventListener("click", function(f) {
                let getrst = rst.value;
                easyBlur({
                  canvasId: "canvas",
                  CORS: true,
                  imgUrl: img.src,
                  vradius: getrst
                });
              });
            }
          });
      }
    });
});

function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    // Handle key press
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}
