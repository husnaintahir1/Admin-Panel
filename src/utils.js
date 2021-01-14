import $ from "jquery";
export function scrollEffect() {
  $(document).ready(function () {
    $(".nav_btn").click(function () {
      $(".mobile_nav_items").toggleClass("active");
    });

    $(".listItem").click(function () {
      if ($("#check").is(":checked")) {
        $(this).next().removeClass("coolclass");
      } else {
        $(this).next().toggleClass("coolclass");
        $(this).find(".rotate").toggleClass("down");
      }
    });
  });
}
