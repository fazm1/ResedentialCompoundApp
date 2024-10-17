import React from 'react';

function AdminSettings() {
  return (
    <div className='Profile'>
      <div className="SettingsTitle">
        <h3> اعدادات المشرف:</h3>
      </div>
    
        <div className="form-group mt-3">
          <label>تغير كلمة المرور</label>
          <input
            type="password"
            className="form-control mt-1"
          />
           <button className ="btn btn-primary mt-3">تغير </button>
        </div>
       
      </div>
        
 
    
  );
}

export default AdminSettings;
