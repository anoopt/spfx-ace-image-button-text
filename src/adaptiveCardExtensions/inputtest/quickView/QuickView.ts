import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'InputtestAdaptiveCardExtensionStrings';
import { IInputtestAdaptiveCardExtensionProps, IInputtestAdaptiveCardExtensionState } from '../InputtestAdaptiveCardExtension';

export interface IQuickViewData {
  actionData?: string;
  actionDataComments?: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IInputtestAdaptiveCardExtensionProps,
  IInputtestAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      actionData: this.state.actionData,
      actionDataComments: this.state.actionDataComments
    };
  }

  public onAction(action: IActionArguments): void {
    if ((<ISubmitActionArguments>action).type !== 'Submit') {
      return;
    }

    const submitAction = <ISubmitActionArguments>action;
    const { comments } = submitAction.data;

    this.setState({
      actionData: `action data - **${JSON.stringify((<ISubmitActionArguments>action).data)}**`,
      actionDataComments: `${comments}`
    });
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}