import React from 'react'
import { message } from 'antd'

interface Props {
	children: React.ReactElement<any>
	[key: string]: any
}

interface State {
	visible: boolean
	confirmLoading: boolean
}

export interface WrappedComponentImplements {
	onConfirmLoading: any
	handleCancel: any

	/** 函数返回promise的resolve时候，取消按钮旋转, 第二个参数为成功后的回调 */
	asyncConfirm: (asyncCb?: () => Promise<any>, successCb?: () => void) => void
}

export interface WrappedComponentProps extends Props, State, WrappedComponentImplements { }

export default (WrappedComponent: React.ComponentType<WrappedComponentProps>): React.ComponentType<Props> => {

	return class extends React.Component<Props, State> implements WrappedComponentImplements {
		wrappedReactInstance: any

		state = {
			visible: false,
			confirmLoading: false,
		}

		showModal = () => this.setState({ visible: true }, () => {
			// this.props.showbefore && this.props.showbefore()
			// this.refs.WrappedComponent.showAfter && this.refs.WrappedComponent.showAfter()
		})

		onConfirmLoading = (isSwitch: boolean) => this.setState({ confirmLoading: isSwitch })

		handleCancel = (cb?: Function) => {
			this.setState({
				visible: false,
				confirmLoading: false,
			}, cb && cb())
		}

		asyncConfirm = async (asyncCb?: () => Promise<any>, successCb?: () => void) => {
			if (!asyncCb) {
				this.handleCancel()
				return
			}
			this.setState({
				confirmLoading: true,
			}, async () => {
				try {
					await asyncCb()
					this.handleCancel(successCb)
				} catch (error) {
					// this.handleCancel()
					this.onConfirmLoading(false)
					message.error(`This is a message of error：${error}`)
				}

			})
		}


		render() {
			return (
				[
					React.cloneElement(this.props.children, { onClick: this.showModal, key: 'outer' }),
					<WrappedComponent
						ref={(ele: any) => this.wrappedReactInstance = ele}
						key="WrappedComponent"
						onConfirmLoading={this.onConfirmLoading}
						handleCancel={this.handleCancel}
						asyncConfirm={this.asyncConfirm}
						{...this.state}
						{...this.props}
					/>,
				]
			)
		}
	}
}
