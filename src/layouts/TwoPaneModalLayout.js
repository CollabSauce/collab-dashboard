import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row, Modal } from 'reactstrap';
import Background from 'src/components/Background';
import Flex from 'src/components/Flex';
import Section from 'src/components/Section';

import bgShape from 'src/assets/bg-shape.png';
import shape1 from 'src/assets/shape-1.png';
import halfCircle from 'src/assets/half-circle.png';

const TwoPaneModalLayout = ({ leftSideHeader, leftSideBody, leftSideBody2, onClose, children }) => {
  return (
    <Modal isOpen={true} toggle={onClose} onClosed={onClose}>
      <Section fluid className="py-0">
        <Row noGutters className="min-vh-100 flex-center">
          <Col lg={8} className="col-xxl-5 py-3">
            <img className="bg-auth-circle-shape" src={bgShape} alt="" width="250" />
            <img className="bg-auth-circle-shape-2" src={shape1} alt="" width="150" />
            <Card className="overflow-hidden z-index-1">
              <CardBody className="p-0">
                <Row noGutters className="h-100">
                  <Col md={5} className="text-white text-center bg-card-gradient">
                    <div className="position-relative p-4 pt-md-5 pb-md-7">
                      <Background image={halfCircle} className="bg-auth-card-shape" />
                      <div className="z-index-1 position-relative">
                        <div className="text-white mb-4 text-sans-serif font-weight-extra-bold fs-4 d-inline-block">
                          {leftSideHeader}
                        </div>
                        <p className="text-100">{leftSideBody}</p>
                        {leftSideBody && <p className="text-100 mt-3">{leftSideBody2}</p>}
                      </div>
                    </div>
                  </Col>
                  <Col md={7} tag={Flex} align="center" justify="center">
                    <div className="p-4 p-md-5 flex-grow-1">{children}</div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Section>
    </Modal>
  );
};
TwoPaneModalLayout.propTypes = {
  leftSideHeader: PropTypes.node.isRequired,
  leftSideBody: PropTypes.node.isRequired,
  leftSideBody2: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TwoPaneModalLayout;
