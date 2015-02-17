<?php
/**
 * Created by PhpStorm.
 * User: damian
 * Date: 29.10.14
 * Time: 12:09
 */

namespace App\Models;


abstract class BaseFieldsConverter
{
    protected $rawFields = array();
    protected $convertedFields = array();
    protected $mapper = array();

    public function __construct(array $rawFields = array())
    {
        $this->setFields($rawFields);
    }

    public function setFields(array $rawFields){
        $this->rawFields = $rawFields;
    }

    public function convert($reverse = false)
    {
        $this->convertedFields = array();
        foreach($this->rawFields as $fieldName => $fieldValue){
            $this->convertField($fieldName, $reverse);
        }
        return $this->convertedFields;
    }

    public function reverse(){
        return $this->convert(true);
    }

    /**
     * @deprecated
     * @param bool $reverse
     * @return array
     */
    public function getConvertedFields($reverse = false)
    {
        return $this->convert($reverse);
    }

    protected function convertIfNotEmpty($value)
    {
        if(!empty($value)){
            return $value;
        }

        return null;
    }

    protected function convertNotEmpty($value)
    {
        return $this->convertIfNotEmpty($value);
    }

    private function innerFunctionName($funcName, $reverse = false)
    {
        if(!empty($funcName)){
            $funcName = str_replace(array('convert', 'reverse'), '', $funcName);
            $funcName = ($reverse ? 'reverse' : 'convert').$funcName;
        }

        return $funcName;
    }

    private function explodeFieldRule($fieldRule)
    {
        $ruleParts = explode(':', $fieldRule);
        $result = array(
            'fieldName' => trim($ruleParts[0]),
            'fieldFunc' => trim((string)$ruleParts[1])
        );
        return $result;
    }

    private function implodeFieldRule(array $ruleParts)
    {
        $result = $ruleParts['fieldName'];
        if(!empty($ruleParts['fieldFunc'])){
            $result.= ':'.$ruleParts['fieldFunc'];
        }

        return $result;
    }

    protected function getReversedMapper()
    {
        $result = array();
        foreach($this->mapper as $fieldName => $fieldRule){
            $rule = $this->explodeFieldRule($fieldRule);
            if(empty($rule['fieldName'])){
                $rule['fieldName'] = $fieldName;
            }
            $result[$rule['fieldName']] = $this->implodeFieldRule(array(
                'fieldName' => $fieldName,
                'fieldFunc' => $this->innerFunctionName($rule['fieldFunc'], true)
            ));
        }
        return $result;
    }

    private function convertField($fieldName, $reverse = false)
    {
        $mapper = $reverse ? $this->getReversedMapper() : $this->mapper;
        if(isset($mapper[$fieldName])) {
            $fieldRule = $mapper[$fieldName];
            $ruleParts = $this->explodeFieldRule($fieldRule);
            //случай fieldName => convertedFieldName
            if (empty($ruleParts['fieldFunc'])) {
                $this->convertedFields[$ruleParts['fieldName']] = $this->rawFields[$fieldName];
            } else {
                $convertedFieldName = $ruleParts['fieldName'];
                //случай fieldName => :someAction
                if(empty($convertedFieldName)){
                    $convertedFieldName = $fieldName;
                }
                $functionName = $ruleParts['fieldFunc'];
                //случай fieldName => convertedFieldName:someAction
                if($functionName && method_exists($this, $functionName)){
                    $convertedFieldValue = call_user_func_array(array($this, $functionName), array_merge(
                       array($this->rawFields[$fieldName], $fieldRule)
                    ));
                }
                else{
                    $convertedFieldValue = $this->rawFields[$fieldName];
                }

                if(isset($convertedFieldName)){
                    $this->convertedFields[$convertedFieldName] = $convertedFieldValue;
                }
            }
        }
        else{
            //Если правило не задано - то имя и значения поля такие же как и входные
            $this->convertedFields[$fieldName] = $this->rawFields[$fieldName];
        }
    }
}