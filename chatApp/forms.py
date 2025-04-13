from django import forms
from . models import CustomUser

class CustomUserCreationForm(forms.ModelForm):
  password = forms.CharField(widget=forms.PasswordInput)
  confirm_password = forms.CharField(widget=forms.PasswordInput)

  class Meta:
    model = CustomUser
    fields = ['first_name', 'last_name', 'username', 'email', 'password', 'confirm_password']

  def clean(self):
    cleaned_data = super().clean()
    password = cleaned_data.get('password')
    confirm_password = cleaned_data.get('confirm_password')

    if password and confirm_password:
      if password != confirm_password:
        raise forms.ValidationError("The password fields does not match!")
    
    return cleaned_data

  def save(self, commit=True):
    user = super().save(commit=False)
    #set password hash
    user.set_password(self.cleaned_data['password'])
    if commit:
      user.save()
    return user