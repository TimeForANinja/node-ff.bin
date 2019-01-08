declare module 'ff.bin' {
  type locations = {
    ffmpeg: string;
    ffprobe: string;
    ffplay: string || null;
  }
  export = locations;
}
