import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'
import '../../assest/font-awesome/css/font-awesome.min.css'
import { deleteChildren } from '../../actions/popup'

class Dialog extends Component {

    handleClose = () => {
        const { onClose } = this.props
        onClose()
    }

    render () {
        const { children } = this.props
        return (
            <section className={'dialog'}>
                <section className="dialog-header">
                    <button
                        className={'dialog-button dialog-button-danger'}
                        onClick={this.handleClose}
                    >
                        <i className="fa fa-close" aria-hidden="true"></i>
                    </button>
                </section>
                <section className="dialog-body">
                    { children }
                </section>
            </section>
        )
    }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(deleteChildren())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)