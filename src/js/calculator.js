(function($,_) {

    var Operators = {
        add : function(a, b) {
            return parseInt(a) + parseInt(b);
        },
        multiply : function(a, b) {
            return parseInt(a) * parseInt(b);
        }
    };

    function throught(run) {
        _.each(Operators, function(item, key) {
            run(item, key);
        });
    }

    function setup() {
        throught(function(value, key){$("#type").append('<option>'+key+'</option>')})
    }

    setup();

    _.templateSettings.variable = 'data';
    var template = _.template($("script.template").html());

    var apply = "apply";
    var applyQuery = {type : apply};
    var dataTable = [];
    var i = 0;

    $("#step").on("click", function () {
        var $type = $("#type");
        var $number = $("#number");

        function insert() {
            dataTable.push({id : i++, type : $type.val(), number : $number.val()});
        }

        function insertOne(query) {
            var whatis = _.where(dataTable, query);
            whatis.length < 1 ? insert() : '';
        }

        function differ(value) {
            var field = $type.val();
            (field === value) ? insertOne(applyQuery) : insert();
        }

        function validate() {
            ($type.val() !== "" || $type.val() !== null) ?
                differ(apply) :
                console.log('Number is missing in field.');
        }

        validate();

        $("#operations").html(template(dataTable));
    });

    $('#calculate').on("click", function () {

        // Get tight data
        function narrow(where, what, by) {
            return project(_.where(where, what), by);
        }

        function project(table, keys) {
            return _.map(table, function(obj) {
                return _.pick.apply(null, arrayize(obj, keys));
            });
        }

        function arrayize(head, tail) {
            return concat([head], _.toArray(tail));
        }

        function concat() {
            var head = _.first(arguments); if (exists(head))
                return head.concat.apply(head, _.rest(arguments)); else
                return [];
        }

        function exists(x) { return x != null }

        // Get wide data

        function result(data, result) {
            return calculate(data, result, narrow(data, {type : result}, ["number"])[0].number);
        }

        function calculate(data, nor, input) {
            var output = input;
            _.each(restrict(data, function (item) {
                return item.type !== nor;
            }), function (row) {
                throught(function(operate, key){
                    if (key === row.type) output = operate(output, row.number);
                });
            });
            return output;
        }

        function restrict(table, pred) {
            return _.reduce(table, function(newTable, obj) {
                if (truthy(pred(obj))) return newTable;
                else return _.without(newTable, obj);
            }, table);
        }

        function truthy(x) { return (x !== false) && exists(x) }

        $("#result").html(function() {
            return result(dataTable, apply);
        });
    });

    $('#reset').on("click", function () {
        function reset() {
            dataTable = [];
            $("#operations").html(template(dataTable));
            $("#result").html('');
            i = 0;
        }

        reset();
    });

})(Zepto,_);