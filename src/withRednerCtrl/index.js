// 用途：
// 將 Compnent render 的邏輯包在自己的 Component 底下，不用在 container 會別的 Component 做方便管控
// 主要邏輯：
// 1.需要每次都 reload 的 component 不管是否 isDataReady 都秀 Loading
// 2.如果有特別要秀空狀態，在 isFetching = false && isDataReady = false 時就秀空狀態的 Component

import React, { Component } from 'react';
import { bool, any } from 'prop-types';


export default function withRenderCtrl (
	WrappedComponent /* react element */,
	loadingComponent = () => <div>Loading</div>,
	emptyComponent = () => <div>Empty</div>
) {
	return class RenderCtrl extends Component {
		static propTypes = {
			isDataReady: any, // 由 Component 有沒有資料決定
			isFetching: bool, // 由 API 是否Fetching 決定
			hasCustomizedEmptyComponent: bool, // 請照字面翻譯，不懂請右轉張CTO
			shouldReloadEverytime: bool // 手動提入是否需要每次顯示 loading (即使local端已有資料)，適用於較即時、變化可能較大或比較敏感的資料
		}
		static defaultProps = {
			isDataReady: false,
			isFetching: false,
			hasCustomizedEmptyComponent: false,
			shouldReloadEverytime: false
		}
		render() {
			const {
				isDataReady,
				isFetching,
				hasCustomizedEmptyComponent,
				shouldReloadEverytime
			} = this.props;
			if (!shouldReloadEverytime) {
				if (isDataReady) {
					return <WrappedComponent { ...this.props } />;
				}
				if (isFetching) {
					return loadingComponent();
				}
				if (hasCustomizedEmptyComponent) {
					return emptyComponent();
				}
				return <WrappedComponent { ...this.props } />;
			}

			if (isFetching) {
				return loadingComponent();
			}
			if (!isDataReady) {
				if (hasCustomizedEmptyComponent) {
					return emptyComponent();
				}
				return <WrappedComponent { ...this.props } />;
			}
			return <WrappedComponent { ...this.props } />;
		}
	};
}
