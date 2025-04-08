import PropTypes from "prop-types";

const TableHeader = ({ selectAll, onSelectAll }) => {
    return (
        <div className="flex items-center justify-between w-full p-4 mb-4 bg-white border-2 rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={selectAll}
                    onChange={(e) => onSelectAll(e.target.checked)}
                />
                <span className="font-semibold">Sản phẩm</span>
            </div>
            <div className="flex items-center space-x-16">
                <span className="font-semibold">Đơn giá</span>
                <span className="font-semibold">Số lượng</span>
                <span className="font-semibold">Thành tiền</span>
                <span className="font-semibold">Thao tác</span>
            </div>
        </div>
    );
};

TableHeader.propTypes = {
    selectAll: PropTypes.bool.isRequired,
    onSelectAll: PropTypes.func.isRequired,
};

export default TableHeader;