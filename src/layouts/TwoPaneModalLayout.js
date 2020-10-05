import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, Modal } from 'reactstrap';
import Background from 'src/components/Background';
import Flex from 'src/components/Flex';

import halfCircle from 'src/assets/half-circle.png';

const TwoPaneModalLayout = ({ leftSideHeader, leftSideBody, leftSideFooter, onClose, className, children }) => {
  return (
    <Modal size="lg" centered isOpen={true} toggle={onClose} onClosed={onClose} className={className}>
      <Card className="overflow-hidden z-index-1">
        <CardBody className="p-0">
          <Row noGutters className="h-100">
            <Col lg={5} className="text-white text-center bg-card-gradient d-flex align-items-center">
              <div className="position-relative py-4 px-3 py-lg-5 w-100">
                <Background image={halfCircle} className="bg-auth-card-shape" />
                <div className="z-index-1 position-relative">
                  <div className="text-white mb-4 text-sans-serif font-weight-extra-bold fs-4 d-inline-block">
                    {leftSideHeader}
                  </div>
                  <p className="text-100">{leftSideBody}</p>
                  {leftSideFooter && <div>{leftSideFooter}</div>}
                </div>
              </div>
            </Col>
            <Col lg={7} tag={Flex} align="center" justify="center">
              <div className="p-4 p-lg-5 flex-grow-1">{children}</div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Modal>
  );
};
TwoPaneModalLayout.propTypes = {
  leftSideHeader: PropTypes.node.isRequired,
  leftSideBody: PropTypes.node.isRequired,
  leftSideFooter: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TwoPaneModalLayout;
