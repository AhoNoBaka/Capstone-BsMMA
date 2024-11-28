function changeVideo(videoSrc) {
  var video = document.getElementById("vtuberVideo");
  var source = video.getElementsByTagName("source")[0];
  source.src = videoSrc;
  video.load();
}
