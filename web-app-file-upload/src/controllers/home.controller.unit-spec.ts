import {Injector, ResolvedRoute} from "@typeix/resty";
import {HomeController} from "./home.controller";
import {AssetsLoaderService} from "~/components/assets-loader.service";
import {TemplateEngineService} from "~/components/templating-engine.service";
import {ServerResponse} from "http";


describe("Home controller", () => {

  let controller: HomeController;
  let assetsMock = {};
  let templateMock = {
    compileAndRender: tpl => Promise.resolve(tpl)
  };
  let responseMock = {};
  let route = {
    path: "/",
    url: {
      href: "/"
    }
  };

  beforeAll( () => {
    let injector =  Injector.Sync.createAndResolve(HomeController, [
      {
        provide: ResolvedRoute,
        useValue: route
      },
      {
        provide: ServerResponse,
        useValue: responseMock
      },
      {
        provide: AssetsLoaderService,
        useValue: assetsMock
      },
      {
        provide: TemplateEngineService,
        useValue: templateMock
      }
    ]);
    controller = injector.get(HomeController);
  });

  it("Should test redirect action", async () => {
    let templateSpy = jest.spyOn(templateMock, "compileAndRender");
    await controller.actionIndex();
    expect(templateSpy).toHaveBeenCalledWith("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example",
      href: "/"
    });
  });
});
