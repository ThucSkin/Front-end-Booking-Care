import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        });
    }

    handleSaveContentMarkDown = () => {
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
    }

    handleOnChangeDes = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        return (
            <>
                <Container>
                    <div className="manage-doctor-container">
                        <div className="manage-doctor-title">
                            Doctor details
                        </div>
                        <div className="more-info">
                            <div className="content-left form-group">
                                <label className='mb-2'>Chọn bác sĩ:</label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="content-right">
                                <label className='mb-2'>Thông tin:</label>
                                <textarea onChange={(e) => this.handleOnChangeDes(e)}
                                    value={this.state.description} name="" id="" rows={4} className='form-control'>
                                </textarea>
                            </div>
                        </div>
                        <div className="manage-doctor-editor">
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                        </div>
                        <button onClick={() => this.handleSaveContentMarkDown()} className="btn-save">Save</button>
                    </div>
                </Container>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
