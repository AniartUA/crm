<?php namespace App\Models;

use App\Interfaces\Errorable;
use App\Interfaces\ModelInterface;
use App\Traits\Errors;
use App\Support\Arrays;

abstract class BaseRepository implements Errorable
{
    use Errors;
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;
    /**
     * @var \Illuminate\Database\Eloquent\Builder|static
     */
    protected $query;

    /**
     * @param BaseModel $model
     */
    public function __construct(BaseModel $model)
    {
        $this->model = $model;
        $this->errors = new ErrorBag();
    }

    /**
     * @return BaseModel|\Illuminate\Database\Eloquent\Model
     */
    public function getModel()
    {
        return $this->model;
    }

    public function newInstance(array $attributes = array())
    {
        return $this->model->newInstance($attributes);
    }

    /**
     * @param $id
     * @param array $columns
     * @return \Illuminate\Support\Collection|BaseModel|static
     */
    public function find($id, $columns = array('*'))
    {
        return $this->model->findOrFail($id, $columns);
    }

    /**
     * @param array $columns
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all($columns = array('*'))
    {
        return $this->get($columns);
    }


    /**
     * @param int $perPage
     * @param array $columns
     * @return \Illuminate\Pagination\Paginator
     */
    public function paginate($perPage = 15, $columns = array('*'))
    {
        $result = $this->queryBuilder()->paginate($perPage, $columns);
        unset($this->query);
        return $result;
    }

    /**
     * @param array $columns
     * @return array|\Illuminate\Database\Eloquent\Collection|static[]
     */
    public function get($columns = array('*'))
    {
        $result = $this->queryBuilder()->get($columns);
        unset($this->query);
        return $result;
    }

    /**
     * @param $fieldName
     * @param $sortOrder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function orderByField($fieldName, $sortOrder)
    {
        $this->queryBuilder()->orderBy($fieldName, $sortOrder);
        return $this;
    }

    public function with($relations)
    {
        $this->queryBuilder()->with($relations);
        return $this;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder|static|\Illuminate\Database\Query\Builder
     */
    protected function queryBuilder()
    {
        if(!isset($this->query)){
            $this->query = $this->model->newQuery();
        }
        return $this->query;
    }

    /**
     * @param array $attributes
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create(array $attributes = array())
    {
        return $this->model->create($attributes);
    }

    public function save($model)
    {
        return $model->save();
    }

    /**
     * @param $id
     * @param array $input
     * @return bool|int
     */
    public function update($id, array $input = array())
    {
        $this->model = $this->model->find($id);
        return $this->model->update($input);
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }
}

?>