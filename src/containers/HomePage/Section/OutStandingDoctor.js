import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {

    render() {
        return (
            <div className="section-share section-outstandingdoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>Bác sĩ nổi bật tuần qua</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='slider-customize slider-doctor'>
                                <div className="bg-image img-outstandingdoctor"></div>
                                <div className='text'>
                                    <div className="">Giáo sư | Thức Skin</div>
                                    <div className="">Đau nhứt xương khớp</div>
                                </div>
                            </div>
                            <div className='slider-customize slider-doctor'>
                                <div className="bg-image img-outstandingdoctor"></div>
                                <div className='text'>
                                    <div className="">Giáo sư | Thức Skin</div>
                                    <div className="">Đau nhứt xương khớp</div>
                                </div>
                            </div>
                            <div className='slider-customize slider-doctor'>
                                <div className="bg-image img-outstandingdoctor"></div>
                                <div className='text'>
                                    <div className="">Giáo sư | Thức Skin</div>
                                    <div className="">Đau nhứt xương khớp</div>
                                </div>
                            </div>
                            <div className='slider-customize slider-doctor'>
                                <div className="bg-image img-outstandingdoctor"></div>
                                <div className='text'>
                                    <div className="">Giáo sư | Thức Skin</div>
                                    <div className="">Đau nhứt xương khớp</div>
                                </div>
                            </div>
                            <div className='slider-customize slider-doctor'>
                                <div className="bg-image img-outstandingdoctor"></div>
                                <div className='text'>
                                    <div className="">Giáo sư | Thức Skin</div>
                                    <div className="">Đau nhứt xương khớp</div>
                                </div>
                            </div>
                            <div className='slider-customize slider-doctor'>
                                <div className="bg-image img-outstandingdoctor"></div>
                                <div className='text'>
                                    <div className="">Giáo sư | Thức Skin</div>
                                    <div className="">Đau nhứt xương khớp</div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
