import {PreWidget, WidgetInstance} from "../Widget/types";
import {Layout} from "../Layout/types";
import {PreService} from "../Service/types";
import {validateWidget} from "./utils/metaValidation";
import {ServicePool} from "./ServicePool";
import {matchInjections} from "./utils/matchInjections";
import {getInjectableMetadata} from "./utils/getInjectableMetadata";

export async function Page(services: PreService[],
                           preWidgets: PreWidget[],
                           Layout: Layout) {

    const servicesPool = new ServicePool(services)
    const widgets = initWidgets(preWidgets, servicesPool)
    await servicesPool.executeServices()
    const resolvedWidgets = {}
    const resolvePromises = []
    for (let widgetName in widgets) {
        if (!widgets.hasOwnProperty(widgetName)) continue
        const resolvePromise = widgets[widgetName].resolve()
            .then(resolvedWidget => resolvedWidgets[widgetName] = resolvedWidget)
        resolvePromises.push(resolvePromise)
    }
    await Promise.all(resolvePromises)
    return Layout(resolvedWidgets)
}

function initWidgets(widgets: PreWidget[], services: ServicePool): Record<string, WidgetInstance> {
    return widgets.reduce((widgetsCollection, preWidget) => {
        if (!validateWidget(preWidget)) throw Error('Invalid Widget')

        const metadata = getInjectableMetadata(preWidget)
        const params = matchInjections(metadata, services)

        if (widgetsCollection[metadata.uniqueName]) throw Error(`widget name '${metadata.uniqueName} is not unique`)

        widgetsCollection[metadata.uniqueName] = new preWidget(params)

        return widgetsCollection
    }, {})
}