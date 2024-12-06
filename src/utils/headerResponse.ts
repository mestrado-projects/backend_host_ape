class HeadersResponseHelper {
  private static instance: HeadersResponseHelper;

  public static getInstance(): HeadersResponseHelper {
    if (!HeadersResponseHelper.instance) {
      HeadersResponseHelper.instance = new HeadersResponseHelper();
    }
    return HeadersResponseHelper.instance;
  }

  getDefaultHeaders(): any {
    return new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    });
  }
}

export default HeadersResponseHelper;
