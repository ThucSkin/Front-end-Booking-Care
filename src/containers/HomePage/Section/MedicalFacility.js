import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class MedicalFacility extends Component {

    render() {
        return (
            <div className="section-share">
                <div className="section-container">
                    <div className="section-header">
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='slider-customize'>
                                <div className="bg-image img-medical-facility "></div>
                                <div className='text'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-medical-facility"></div>
                                <div className='text'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-medical-facility"></div>
                                <div className='text'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-medical-facility"></div>
                                <div className='text'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-medical-facility"></div>
                                <div className='text'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-medical-facility"></div>
                                <div className='text'>Bệnh viện Hữu nghị Việt Đức</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
