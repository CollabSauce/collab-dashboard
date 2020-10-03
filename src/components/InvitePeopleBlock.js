import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Col, Form, Input, Row, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import gifts from 'src/assets/gifts.png';
import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';
import { useStoreState } from 'src/hooks/useStoreState';

const InvitePeople = ({ inputCol, btnCol, className, brClass, titleClass, isInputAutoFocus, inModal, onInvite }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // TODO: currently assuming only one organization
  const { result: organizations } = useStoreState((store) => store.getAll('organization'), [], 'organization');

  const handleSendInvitation = async (event) => {
    event.preventDefault();
    try {
      const emailValid = email.length && email.includes('@');
      if (emailValid) {
        setLoading(true);
        const data = { email, organization: organizations[0].id };
        await jsdataStore.getMapper('invite').createInvite({ data });
        setLoading(false);
        setEmail('');
        toast.success(
          <>
            Sent invitation to <span className="font-weight-semi-bold font-italic">{email}</span>
          </>
        );
        if (onInvite) {
          onInvite();
        }
      } else {
        toast.error('Please enter a valid email');
      }
    } catch (e) {
      console.log(e);
      toast.error(handleNetworkError(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!email);
  }, [email]);

  if (!organizations.length) {
    return <Redirect to="/" />;
  }

  return (
    <Card className={className}>
      <CardBody className="overflow-hidden text-center pt-5">
        <Row className="justify-content-center">
          <Col xs={7} md={5}>
            <img className="img-fluid" src={gifts} alt="" />
          </Col>
        </Row>
        <h3 className={`mt-3 mt-md-4 font-weight-normal ${titleClass}`}>
          Invite your{inModal ? '' : ' first'} teammate to start collab-ing!{' '}
          <span role="img" aria-label="paint">
            🎨
          </span>
        </h3>
        <p className="lead">
          Invite your friends and start working together in seconds. <br className={brClass} />
          Everyone you invite will receive a welcome email.
        </p>
        <Row className="justify-content-center mt-5 mb-4">
          <Col md={inputCol}>
            <Form onSubmit={handleSendInvitation}>
              <Row form>
                <Col className="mb-2 mb-sm-0">
                  <Input
                    type="email"
                    placeholder="Email address"
                    aria-label="Recipient's username"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    autoFocus={isInputAutoFocus}
                  />
                </Col>
                <Col xs={12} sm="auto">
                  <Button color="primary" block type="submit" disabled={isDisabled}>
                    {loading ? <Spinner color="light" /> : 'Send Invitation'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

InvitePeople.propTypes = {
  inputCol: PropTypes.number,
  btnCol: PropTypes.number,
  className: PropTypes.string,
  brClass: PropTypes.string,
  titleClass: PropTypes.string,
  isInputAutoFocus: PropTypes.bool,
};
InvitePeople.defaultProps = {
  inputCol: 7,
  btnCol: 4,
  brClass: 'd-md-block d-none',
  titleClass: 'fs-2 fs-md-3',
  isInputAutoFocus: true,
};

export default InvitePeople;
