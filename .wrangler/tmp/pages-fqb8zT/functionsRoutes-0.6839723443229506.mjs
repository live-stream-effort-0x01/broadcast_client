import { onRequestDelete as ____path___js_onRequestDelete } from "C:\\Users\\user\\broadcast_client\\functions\\[[path]].js"
import { onRequestGet as ____path___js_onRequestGet } from "C:\\Users\\user\\broadcast_client\\functions\\[[path]].js"
import { onRequestHead as ____path___js_onRequestHead } from "C:\\Users\\user\\broadcast_client\\functions\\[[path]].js"
import { onRequestPatch as ____path___js_onRequestPatch } from "C:\\Users\\user\\broadcast_client\\functions\\[[path]].js"
import { onRequestPost as ____path___js_onRequestPost } from "C:\\Users\\user\\broadcast_client\\functions\\[[path]].js"

export const routes = [
    {
      routePath: "/:path*",
      mountPath: "/",
      method: "DELETE",
      middlewares: [],
      modules: [____path___js_onRequestDelete],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [____path___js_onRequestGet],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "HEAD",
      middlewares: [],
      modules: [____path___js_onRequestHead],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "PATCH",
      middlewares: [],
      modules: [____path___js_onRequestPatch],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [____path___js_onRequestPost],
    },
  ]