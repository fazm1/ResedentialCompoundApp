import React from 'react';

function UserEditComplaint() {
  return (
    <div className="Complaints">
      <h3>
        تعديل شكوى:
      </h3>
      <span>
        قم بتعديل الشكوى الخاصة بكم
      </span>
      <div className="form-group mt-4">
          <label>تعديل عنوان الشكوى</label>
          <input
            type="text"
            className="form-control mt-1"
          />
        </div>
      <div className="form-group mt-1">
          <label>تعديل نص الشكوة:</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" value="">
            
          </textarea>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="SubmitComplaint btn btn-primary">
            تعديل الشكوة
          </button>
        </div>
    </div>
    
  );
}

export default UserEditComplaint;
