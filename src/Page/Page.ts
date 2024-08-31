import {PreWidget, WidgetInstance} from "../Widget";
import {Layout} from "../Layout";
import {PreService} from "../Service";
import {validateWidget} from "./utils/metaValidation";
import {ServicePool} from "./ServicePool";
import {matchInjections} from "./utils/matchInjections";
import {getInjectableMetadata} from "./utils/getInjectableMetadata";

export async function Page(services: PreService[],
                           preWidgets: PreWidget[],
                           layout: Layout) {

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
    return layout(resolvedWidgets)
}

function initWidgets(widgets: PreWidget[], services: ServicePool): Record<string, WidgetInstance> {
    return widgets.reduce((widgetsCollection, preWidget) => {
        if (!validateWidget(preWidget)) throw Error('Invalid Widget')

        const metadata = getInjectableMetadata(preWidget)
        const params = matchInjections(metadata, services).map(state=>state.instance)

        if (widgetsCollection[metadata.uniqueName]) throw Error(`widget name '${metadata.uniqueName} is not unique`)

        widgetsCollection[metadata.uniqueName] = new preWidget(...params)

        return widgetsCollection
    }, {})
}