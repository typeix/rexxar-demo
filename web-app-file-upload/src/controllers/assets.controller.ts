import {AssetsLoaderService} from "~/components/assets-loader.service";
import {
  Inject,
  Produces,
  Controller, GET, PathParam
} from "@typeix/resty";
import {getType} from "mime";
import {ServerResponse} from "http";
/**
 * Controller example
 * @constructor
 * @function
 * @name AssetsController
 *
 * @description
 * Define controller, assign action and inject your services.
 * Each request create new instance of controller, your Injected type is injected by top level injector if is not defined
 * as local instance as providers to this controllers
 *
 * Controllers can be Inherited by thy don't necessary need's to be inherited
 */
@Controller({
  path: "/",
  providers: [] // type of local instances within new request since controller is instanciated on each request
})
export class AssetsController {

  @Inject() assetLoader: AssetsLoaderService;
  @Inject() response: ServerResponse;
  /**
   * @function
   * @name fileLoadAction
   *
   * @description
   * This action loads file from disk
   * \@Produces("image/x-icon") -> content type header
   */
  @Produces("image/x-icon")
  @GET("favicon.ico")
  faviconLoader() {
    return this.fileLoadAction("favicon.png");
  }

  /**
   * @function
   * @name fileLoadAction
   *
   * @description
   * This action loads file from disk
   *
   */
  @GET("assets/<file:(.*)>")
  async fileLoadAction(@PathParam("file") file: string) {
    const loadedFile: Buffer = await this.assetLoader.load(file);
    const type = getType(AssetsLoaderService.publicPath(file));
    this.response.setHeader("Content-Type", type);
    this.response.setHeader("Content-Length", loadedFile.length);
    return loadedFile;
  }
}
