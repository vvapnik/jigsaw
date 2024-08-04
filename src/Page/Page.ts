import {PreWidget, WidgetInstance} from "../Widget/types";
import {Layout} from "../Layout/types";
import {PreService, ServiceInstance} from "../Service/types";
import {validateService, validateWidget} from "./utils/metaValidations";
import {matchServiceInjections} from "./utils/matchServiceInjections";

export class Page {
    protected services: ServiceInstance[] = []
    protected widgets: WidgetInstance[] = []

    constructor(services: PreService[],
                widgets: PreWidget[],
                protected layout: Layout) {

        services.forEach(service => this.initService(service))
    }

    private initService(service: PreService) {
        if (!validateService(service)) return
        const params = matchServiceInjections(service, this.services)
        this.services.push(service(params))
    }

    private initWidget(widget: PreWidget) {
        if (!validateWidget(widget)) return
        const params = matchServiceInjections(widget, this.services)
        this.widgets.push(widget(params))
    }

}