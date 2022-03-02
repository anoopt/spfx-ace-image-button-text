import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { InputtestPropertyPane } from './InputtestPropertyPane';

export interface IInputtestAdaptiveCardExtensionProps {
  title: string;
}

export interface IInputtestAdaptiveCardExtensionState {
  actionData?: string;
  actionDataComments?: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'Inputtest_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Inputtest_QUICK_VIEW';

export default class InputtestAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IInputtestAdaptiveCardExtensionProps,
  IInputtestAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: InputtestPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      actionData: "",
      actionDataComments: ""
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Inputtest-property-pane'*/
      './InputtestPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.InputtestPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
