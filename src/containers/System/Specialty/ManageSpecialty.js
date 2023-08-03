import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ManageSprcialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import commonUtils from '../../../utils/CommonUtils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await commonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    hanldeSave = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new succcessfully!')
        } else {
            toast.error('Add new failed!')
        }
    }

    render() {
        console.log('check state:', this.state);

        return (
            <>
                <div className="manage-specialty-container">
                    <div className="title">Quan ly chuyen khoa</div>
                    <div className="add-new-specialty row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="">Ten chuyen khoa</label>
                            <input type="text" className='form-control'
                                value={this.state.name}
                                onChange={(e) => this.handleOnChangeInput(e, 'name')} />
                        </div>
                        <div className="col-md-6 form-group">
                            <input id='previewImg' type="file" hidden
                                onChange={(e) => this.handleOnChangeImage(e)} />
                            <label className='lable-upload' htmlFor="previewImg">Tải ảnh <i className='fas fa-upload'></i></label>
                        </div>
                        <div className="col-12">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div class="col-2 mx-auto mb-3">
                            <button onClick={() => this.hanldeSave()}>
                                save
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
