<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="UserRequest",
 *     type="object",
 *     required={"name", "email", "age"},
 *     @OA\Property(property="name", type="string", description="User name"),
 *     @OA\Property(property="email", type="string", description="User email"),
 *     @OA\Property(property="age", type="integer", description="User age")
 * )
 */


class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
{
    $userId = $this->route('userId'); // Ambil ID pengguna dari route

    return [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $userId, // Abaikan email pengguna yang sedang diedit
        'age' => 'required|integer|min:18', // Pastikan umur minimal 18
    ];
}    


/**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama pengguna diperlukan.',
            'email.required' => 'Email pengguna diperlukan.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'age.required' => 'Umur pengguna diperlukan.',
            'age.integer' => 'Umur harus berupa angka.',
            'age.min' => 'Umur minimal 18 tahun.',
        ];
    }

}
