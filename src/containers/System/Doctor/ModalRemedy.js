import React, { Component } from 'react';
import { connect } from "react-redux";
import './ModalRemedy.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class ModalRemery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            });
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenModal, clossRemedyModal, dataModal, sendRemedy } = this.props;

        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    size='md'
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='left'>Gui hoa don kham benh</span>
                            <span className='right'>
                                <i onClick={clossRemedyModal} className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>Email benh nhan</label>
                                    <input type="email" name="" id="" className='form-control'
                                        value={dataModal.email}
                                        onChange={(e) => this.handleOnChangeEmail(e)} />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Chon file don thuoc</label>
                                    <input type="file" name="" id="" className='form-control-file'
                                        onChange={(e) => this.handleOnChangeImage(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className='btn-confirm' onClick={() => this.handleSendRemedy()}><FormattedMessage id={"detail-doctor.confirm"} /></button>{''}
                            <button className='btn-cancel' onClick={clossRemedyModal}><FormattedMessage id={"detail-doctor.cancel"} /></button>
                        </div>
                    </div>

                </Modal>
            </ >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemery);
