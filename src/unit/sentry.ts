import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import router from "@/router";

export  function setSentry(app:any){
    if(process.env.NODE_ENV == 'production'){ //在生产环境下应用
        Sentry.init({
            app,
            dsn: "https://88eb89a137004b3cbf50c77eb84b2002@o1051779.ingest.sentry.io/6034967",
            integrations: [
                new Integrations.BrowserTracing({
                    routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                    tracingOrigins: ["localhost", "my-site-url.com", /^\//],
                }),
            ],
            logErrors: true,
            release: process.env.VUE_APP_RELEASE,
        });
    }
}
