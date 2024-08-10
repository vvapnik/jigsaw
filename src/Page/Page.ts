import {PreWidget, WidgetInstance} from "../Widget/types";
import {Layout} from "../Layout/types";
import {PreService} from "../Service/types";
import {validateWidget} from "./utils/metaValidation";
import {ServicePool} from "./ServicePool";
import {matchInjections} from "./utils/matchInjections";
import {getInjectableMetadata} from "./utils/getInjectableMetadata";

export class Page {
    protected widgets: WidgetInstance[] = []
    protected services: ServicePool

    constructor(services: PreService[],
                widgets: PreWidget[],
                protected layout: Layout) {

        this.services = new ServicePool(services)
        widgets.forEach(widget => this.initWidget(widget))
    }


    private initWidget(widget: PreWidget) {
        if (!validateWidget(widget)) return
        const metadata = getInjectableMetadata(widget)
        const params = matchInjections(metadata, this.services)
        this.widgets.push(widget(params))
    }


}