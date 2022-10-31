import Compressor from "compressorjs";

const compressImageClientSide = async (image: File) => {
  const file = new Promise<File | Blob>((resolve, reject) => {
    new Compressor(image, {
      quality: 0.5,
      success: async (result) => {
        if (result) {
          resolve(result);
        } else {
          reject({ message: "Error compressing image" });
        }
      },
    });
  });
  return file;
};

export default compressImageClientSide;
