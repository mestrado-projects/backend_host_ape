import { v2 as cloudinary, ConfigOptions } from "cloudinary";

export default class cloudinaryClient {
  client: ConfigOptions;

  constructor() {
    this.client = cloudinary.config({
      cloud_name: "daam4uopg",
      api_key: "672479223194928",
      api_secret: "8Twv7ypvLMjY9148jUyXng07bo0",
    });
  }

  async uploadImage(): Promise<string> {
    try {
      const uploadResult = await cloudinary.uploader.upload(
        "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        {
          public_id: "shoes",
        },
      );

      if (!uploadResult.url) {
        throw new Error("Image not found");
      }

      return uploadResult.url;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
