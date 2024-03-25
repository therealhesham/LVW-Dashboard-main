import React from 'react'
import StyleModal from './SuccessandErrorModals.module.css'
import Success from '../../../assets/img/success.gif'
import Error from '../../../assets/img/error.gif'



function SuccessandErrorModals(props) {

    return (
      <>
      {/* Success Modal */}
        <div className={StyleModal['modall__content']}>
          {
            props.success?(

              <img src={Success} />
            ):(
              <img src={Error} style={{width: '200px', marginBottom: '30px', marginTop: '80px'}}/>
            )
          }
          <p className={StyleModal['modall__content__p']}>{props.message}</p>
        </div>
      </>
    );
  }

  export default SuccessandErrorModals