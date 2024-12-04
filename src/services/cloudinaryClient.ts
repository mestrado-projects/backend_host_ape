import {
  v2 as cloudinary,
  ConfigOptions,
  UploadApiResponse,
  UploadStream,
} from "cloudinary";
import streamifier from "streamifier";

export default class CloudinaryClient {
  client: ConfigOptions;

  constructor() {
    this.client = cloudinary.config({
      cloud_name: "daam4uopg",
      api_key: "672479223194928",
      api_secret: "8Twv7ypvLMjY9148jUyXng07bo0",
    });
  }

  async uploadImage(imageBuffer: Buffer): Promise<string> {
    try {
      const uploadStream = await this.streamUpload(imageBuffer);

      if (!uploadStream.url) {
        throw new Error("Not upload image");
      }

      return uploadStream.url;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private streamUpload(fileBuffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  }

  async getImage(): Promise<string> {
    try {
      const retrievedUrl = cloudinary.url("shoes", {
        fetch_format: "auto",
        quality: "auto",
      });

      return retrievedUrl;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
