import { Link } from "react-router-dom";

const ClassTable = ({classes, i}) => {
  
  return (
    <tr>
    <th>
     {1 + i}
    </th>
    <td>
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={classes?.classImage} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div className="font-bold">{classes?.className}</div>
          <div className="text-sm opacity-50">${classes?.price}</div>
        </div>
      </div>
    </td>
    <td className="">
      {classes?.students}
    </td>
    <th>
      <button className="btn btn-ghost btn-xs">{classes?.status}</button>
    </th> 
    <td>{classes?.feedBack}</td>
    <th>
      <Link to={`/dashboard/updateclass/${classes?._id}`} className="btn btn-info text-white btn-xs">Update</Link>
    </th>
  </tr>
  );
};

export default ClassTable;